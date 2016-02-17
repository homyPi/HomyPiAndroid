package com.homypiandroid;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.Binder;
import android.widget.Toast;
import android.util.Log;
import android.os.Handler;


import io.socket.emitter.Emitter;
import io.socket.client.IO;
import io.socket.client.Socket;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class SocketService extends Service {
	public static final long PING_DELAY = 300000; //5 min

    private Socket mSocket;
	private static final String TAG = "SocketService";
	private static ArrayList<String> events = new ArrayList<String>();
	private static ArrayList<Delayed> delayedEvents = new ArrayList<Delayed>();
	protected static final Handler pinger = new Handler();

    IBinder mBinder = new LocalBinder();
   
	@Override
	public IBinder onBind(Intent intent) {
	    return mBinder;
	}
	public class LocalBinder extends Binder {
        public SocketService getServerInstance() {
            return SocketService.this;
        }
    }

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		// Let it continue running until it is stopped.
	    Toast.makeText(this, "Service Started", Toast.LENGTH_LONG).show();
	    return START_STICKY;
	}
   
   	@Override
   	public void onDestroy() {
      super.onDestroy();
      if (mSocket != null) {
      	mSocket.disconnect();
      }
      Toast.makeText(this, "Service Destroyed", Toast.LENGTH_LONG).show();
   	}



	public void createSocket(String serverUrl, String token) {
		Log.i(TAG, "CreateSocket");
		if (mSocket != null) {
			if (mSocket.connected())
				return;
			else
				mSocket.disconnect();
		}
		IO.Options opts = new IO.Options();
        opts.forceNew = true;
        opts.reconnection = true;
		opts.query = "token=" + token;
 		try {
			Log.i(TAG, "connecting to " + serverUrl);
            mSocket = IO.socket(serverUrl, opts);
            setDelayed();
		Log.i(TAG, "socket created");
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
	}

	public void setDelayed() {
		Delayed e = null;
		while(delayedEvents.size() > 0) {
			e = delayedEvents.remove(0);
			this.on(e.event, e.callback);
		}
	}

	public void on(String event, Emitter.Listener callback) {
		if (mSocket == null) {
			delayedEvents.add(new Delayed(event, callback));
			return;
		}
		events.add(event);
		mSocket.on(event, callback);
	}

	public void clearEvents() {
		if (mSocket == null) return;
		for (String event: events) {
			mSocket.off(event);
		}
	}

	public void off(String event, Emitter.Listener callback) {
		if (mSocket == null) return;
		mSocket.off(event, callback);
	}

	public void connect() {
		Log.i(TAG, "connecting to socket");
		try {
			mSocket.connect();
			final Socket sock = mSocket;
			mSocket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
				@Override
				public void call(Object... args) {
				    pinger.postDelayed(new Runnable()
				    {
				        private long time = 0;

				        @Override
				        public void run()
				        {
				            time += PING_DELAY;
				            Log.i(TAG, "ping server");
				            sock.emit("ping");
				            pinger.postDelayed(this, PING_DELAY);
				        }
				    }, PING_DELAY);	// ping every PING_DELAY ms
				}
			});
			mSocket.on("ping:received" , new Emitter.Listener() {
				@Override
				public void call(Object... args) {
				    Log.i(TAG, "server pinged back");

				}
			});
		} catch(Exception e) {
    		Log.e(TAG, "Caught Exception: " + e.getMessage());

		}
	}

	public void startPing() {
		
		
	}

	/*
	public void on(final String event) {
		Log.i(TAG, "new event listener fo " + event);
		mSocket.on(event
	}
*/
	
	public void emit(final String event, final String data) {
		Log.i(TAG, "emit with string");
		Log.i(TAG, "emit " + event);
		if(data != null) {
			Log.i(TAG, "with data " + data);
			try {
				JSONObject obj = new JSONObject(data);
				emit(event, obj);
			} catch (JSONException e) {
				return;
			}
		} else {
			mSocket.emit(event);
		}
	}
	public void emit(final String event, JSONObject obj) {
		Log.i(TAG, "emit with JSONObject");
		mSocket.emit(event, obj);
	}
}

class Delayed {
	public String event;
	public Emitter.Listener callback;

	public Delayed(String event, Emitter.Listener callback) {
		this.event = event;
		this.callback = callback;
	}
}