package com.homypiandroid;



import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;
import java.io.InputStream;
import java.net.URL;

import android.support.v4.app.NotificationCompat;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.BroadcastReceiver;
import android.widget.RemoteViews;
import android.widget.ImageButton;
import android.view.View;
import android.net.Uri;
import android.util.Log;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;


import io.socket.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;


import com.homypiandroid.MainActivity;
import com.homypiandroid.SocketConnection;

public class ToastModuleBis extends ReactContextBaseJavaModule {

  private ReactApplicationContext conte;
  private Activity mActivity = null;
  
  private NotificationManager mNotificationManager;
  private static final int NOTIFICATION_ID = 1;
  private int icon = R.drawable.ic_play_circle_outline_grey600_36dp;
  private Notification notification;

  protected static SocketConnection socketConnection;

  private String cover;
  private String currentCoverUrl = "";
  private String playerStatus = "PAUSED";
  private String playerName = "";
  private String trackName = "";
  private String artists = "";


  public static final String KEY_PLAY = "com.homypiandroid.ToastModuleBis.PLAY";
  public static final String KEY_PAUSE = "com.homypiandroid.ToastModuleBis.PAUSE";


  public ToastModuleBis(ReactApplicationContext reactContext, Activity activity, SocketConnection socketConnection) {
    super(reactContext);
    this.conte = reactContext;
    mActivity = activity;
    ToastModuleBis.socketConnection = socketConnection;

  	mNotificationManager = (NotificationManager) mActivity.getSystemService(Context.NOTIFICATION_SERVICE);
  	long when = System.currentTimeMillis();
  	notification = new Notification(icon, "wubba lubba dub dub", when);
    IntentFilter filter = new IntentFilter();
    filter.addAction(KEY_PLAY);
    filter.addAction(KEY_PAUSE);
  // Add other actions as needed

    BroadcastReceiver receiver = new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
          JSONObject json;
          try {
            json = new JSONObject();
            json.put("name", playerName);
          } catch(JSONException exception) {
            return;
          }
          if (intent.getAction().equals(KEY_PLAY)) {
            Log.i("PlayerNotification", "emit play");
            ToastModuleBis.socketConnection.emit("player:resume", json);
          } else if (intent.getAction().equals(KEY_PAUSE)) {
            Log.i("PlayerNotification", "emit pause");
            ToastModuleBis.socketConnection.emit("player:pause", json);
          }
      }
    };
    mActivity.registerReceiver(receiver, filter);
}
  public static Bitmap getBitmapFromURL(String src) {
    try {
      return BitmapFactory.decodeStream((InputStream)new URL(src).getContent());
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
  @Override
  public String getName() {
    return "ToastModuleBis";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  private void sendEvent(String eventName) {
  conte
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, null);
  }


    @ReactMethod
    public void setCover(String coverUrl) {
      cover = coverUrl;
    }

    @ReactMethod
    public void setPlayerName(String plName) {
      playerName = plName;
    }
    @ReactMethod
    public void setTrackName(String tN) {
      trackName = tN;
    }
    @ReactMethod
    public void setArtists(String a) {
      artists = a;
    }
    @ReactMethod
    public void setPlayerStatus(String s) {
      playerStatus = s;
    }


  @ReactMethod
  public void show() {
		RemoteViews contentView = new RemoteViews(mActivity.getPackageName(), R.layout.player_notification);
    if (cover != null) {
      contentView.setImageViewBitmap(R.id.notification_image, getBitmapFromURL(cover));
    } else {
		  contentView.setImageViewResource(R.id.notification_image, R.drawable.ic_play_circle_outline_grey600_36dp);
    }
		contentView.setTextViewText(R.id.notification_title, trackName);
		contentView.setTextViewText(R.id.notification_text, artists);

		if (playerStatus.equals("PLAYING")) {
			contentView.setImageViewResource(R.id.play_pause, R.drawable.ic_pause_black_24dp);
      Intent pauseIntent = new Intent(KEY_PAUSE);
      PendingIntent pausePendingIntent = PendingIntent.getBroadcast(mActivity, 0, pauseIntent, 0);
      contentView.setOnClickPendingIntent(R.id.play_pause, pausePendingIntent);
		} else {
			contentView.setImageViewResource(R.id.play_pause, R.drawable.ic_play_circle_outline_grey600_36dp);
      Intent playIntent = new Intent(KEY_PLAY);
      PendingIntent playPendingIntent = PendingIntent.getBroadcast(mActivity, 1, playIntent, 0);
      contentView.setOnClickPendingIntent(R.id.play_pause, playPendingIntent);
		}

		notification.contentView = contentView;

		Intent notificationIntent = new Intent(mActivity, MainActivity.class);
		PendingIntent contentIntent = PendingIntent.getActivity(mActivity, 0, notificationIntent, 0);

		notification.contentIntent = contentIntent;

		mNotificationManager.notify(NOTIFICATION_ID, notification);
	}
  @ReactMethod
  public void setSocketListeners() {
    this.socketConnection.on("player:status:updated", new Emitter.Listener() {
          @Override
          public void call(final Object... args) {
            Log.i("PlayerNotification", "got socket's event player:status:updated");
            try {
              JSONObject data = (JSONObject) args[0];
              setPlayerStatus(data.getString("status"));
              show();
            } catch (JSONException e) {
              return;
            }
            show();
          }
    });
    this.socketConnection.on("playlist:playing:id", new Emitter.Listener() {
          @Override
          public void call(final Object... args) {
            try {
              JSONObject data = (JSONObject) args[0];
              JSONObject track = data.getJSONObject("track");
              JSONArray  coverImages = track.getJSONObject("album").getJSONArray("images");
              String coverUrl = null;
              if (coverImages.length() > 0) {
                coverUrl = coverImages.getJSONObject(1).getString("url");
                if (currentCoverUrl.equals(coverUrl))
                  coverUrl = null;
              }
              JSONArray  artistsArray = track.getJSONArray("artists");
              String artists = "";
              for (int i = 0; i < artistsArray.length(); i++) {
                artists += artistsArray.getJSONObject(i).getString("name") + "; ";
              }

              setTrackName(track.getString("name"));
              setArtists(artists);
              if (coverUrl != null) {
                setCover(coverUrl);
              }
              show();
            } catch (JSONException e) {
              return;
            }
            show();
          }
    });
    this.socketConnection.on("modules:remove:player", new Emitter.Listener() {
          @Override
          public void call(final Object... args) {
            try {
              JSONObject data = (JSONObject) args[0];
              JSONObject raspberry = data.getJSONObject("raspberry");
              String name = raspberry.getString("name");
              if (playerName.equals(name) && mNotificationManager != null) {
                mNotificationManager.cancel(NOTIFICATION_ID);
              }
            } catch (JSONException e) {
              return;
            }
          }
    });
  }
}