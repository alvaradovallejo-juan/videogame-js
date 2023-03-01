ship = new Image();
ship.src = '../assets/space-ship-svgrepo-com1.svg';

asteroids = new Image();
asteroids.src = '../assets/asteroid-2-svgrepo-com.svg';

empty = new Image();
empty.src = '';

galaxy = new Image();
galaxy.src = '../assets/galaxy-svgrepo-com.svg';

flag = new Image();
flag.src = '../assets/flag-svgrepo-com.svg';

heart = new Image();
heart.src = '../assets/heart-svgrepo-com.svg';

const emojis = {
    "-": empty,
    O: galaxy,
    X: asteroids,
    I: flag,
    PLAYER: ship,
    BOMB_COLLISION: asteroids,
    GAME_OVER: asteroids,
    WIN: asteroids
  };
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);