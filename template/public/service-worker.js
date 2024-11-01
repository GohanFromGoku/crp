const deleteOldCaches = async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => {
      return caches.delete(cacheName);
    })
  );
};

export const register = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });

    registration.onupdatefound = () => {
      const newWorker = registration.installing;

      newWorker.onstatechange = () => {
        if (newWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            deleteOldCaches();
          } else {
            console.log("Content is cached for offline use.");
          }
        }
      };
    };

    return registration;
  } else {
    console.log("No Service Workers found.");
    return;
  }
};

export const unregister = async () => {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        if (registrations.length > 0) {
          console.log("Service Workers found. Unregistering...");
          registrations.forEach(function (registration) {
            registration.unregister().then(function () {
              console.log("Service Worker unregistered:", registration);
            });
          });
        } else {
          console.log("No Service Workers found.");
        }
      })
      .catch(function (error) {
        console.error("Error getting service worker registrations:", error);
      });
  } else {
    console.log("Service Workers are not supported in this browser.");
    return;
  }
};
