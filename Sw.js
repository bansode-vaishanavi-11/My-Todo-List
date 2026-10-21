[1:05 PM, 21/10/2026] bansodevaishnavi047: self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {
    title: "Task Reminder 🔔",
    body: "You have a scheduled task!",
    url: "./tasks.html"
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
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      tag: data.tag || "task-reminder",
      data: {
        url: data.url || "./tasks.html"
      }
    })
  );
});

self.addEventListener("not…
[1:05 PM, 21/10/2026] bansodevaishnavi047: self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {
    title: "Task Reminder 🔔",
    body: "You have a scheduled task!",
    url: "./tasks.html"
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
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      tag: data.tag || "task-reminder",
      data: {
        url: data.url || "./tasks.html"
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "./tasks.html",
    self.registration.scope
  ).href;

  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
