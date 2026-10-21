self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Receive Push Notification
self.addEventListener("push", (event) => {
  let data = {
    title: "TO DO WEB LIST 🔔",
    body: "You have a task reminder!",
    url: "./index.html"
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (error) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag || "task-reminder",
      data: {
        url: data.url
      }
    })
  );
});

// Open App when notification is clicked
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = new URL(
    event.notification.data?.url || "./index.html",
    self.registration.scope
  ).href;

  event.waitUntil(
    clients.openWindow(url)
  );
});
