// components/NotificationHelper.js
export const askNotificationPermission = async () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('✅ Notification permission granted');
  } else {
    console.log('❌ Notification permission denied');
  }
};

export const notifyIfDueTomorrow = (assignments) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatted = tomorrow.toISOString().split('T')[0];

  assignments.forEach((a) => {
    if (a.dueDate === formatted) {
      new Notification('📢 Assignment Reminder', {
        body: `"${a.title}" is due tomorrow!`,
        icon: '/favicon.ico',
      });
    }
  });
};
