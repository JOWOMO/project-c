export default async function(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  const findEl = async (hash, x = 0) => {
    return (
      document.querySelector(hash) ||
      new Promise(resolve => {
        if (x > 50) {
          return resolve(document.querySelector("#app"));
        }
        setTimeout(() => {
          resolve(findEl(hash, ++x || 1));
        }, 100);
      })
    );
  };

  if (to.hash) {
    let el = await findEl(to.hash);
    if ("scrollBehavior" in document.documentElement.style) {
      return el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      return el.scrollIntoView({ block: 'start' });
    }
  }

  return { x: 0, y: 0 };
}
