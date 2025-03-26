export const createMap = (scene: Phaser.Scene): Phaser.Tilemaps.Tilemap => {
  const map = scene.make.tilemap({ key: "first_home" });
  scene.data.set("firstHome", map);

  return map;
};

export const createTileset = (
  map: Phaser.Tilemaps.Tilemap
): Phaser.Tilemaps.Tileset | null => {
  const tileset = map.addTilesetImage("atlas_48x", "atlas_48x");

  return tileset;
};

export const createLayers = (
  map: Phaser.Tilemaps.Tilemap,
  titleset: Phaser.Tilemaps.Tileset,
  scene: Phaser.Scene
): {
  bgLayer: Phaser.Tilemaps.TilemapLayer | null;
  firstFloorLayer: Phaser.Tilemaps.TilemapLayer | null;
  secondFloorLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallLayer: Phaser.Tilemaps.TilemapLayer | null;
  wallObjectLayer: Phaser.Tilemaps.TilemapLayer | null;
  objectLayer: Phaser.Tilemaps.TilemapLayer | null;
  secondWallObjectLayer: Phaser.Tilemaps.TilemapLayer | null;
} => {
  const bgLayer = map.createLayer("bg", titleset);
  const firstFloorLayer = map.createLayer("floor", titleset);
  const secondFloorLayer = map.createLayer("floor_2", titleset);
  const wallLayer = map.createLayer("wall", titleset);
  const wallObjectLayer = map.createLayer("object_wall", titleset);
  const secondWallObjectLayer = map.createLayer("object_wall_2", titleset);
  const objectLayer = map.createLayer("object", titleset);

  scene.data.set("wallLayer", wallLayer);

  scene.data.set("wallObjectLayer", wallObjectLayer);

  scene.data.set("secondWallObjectLayer", secondWallObjectLayer);

  return {
    bgLayer,
    firstFloorLayer,
    secondFloorLayer,
    wallLayer,
    wallObjectLayer,

    objectLayer,
    secondWallObjectLayer
  };
};

export const createJin = (
  scene: Phaser.Scene
): Phaser.Types.Physics.Arcade.SpriteWithStaticBody => {
  const jin = scene.physics.add.staticSprite(1000, 700, "jin_left");

  scene.data.set("jin", jin);

  jin.body.offset.y = 7;
  jin.scale = 2;

  jin.body.setSize(30, 30);

  jin.depth = 2;

  jin.anims.play("jin_left");

  const clothes = scene.physics.add
    .sprite(jin.x, jin.y, `jin_clothes_left`)
    .setScale(2);

  scene.data.set("jin_clothes", clothes);
  clothes.body.immovable = true;
  clothes.setCollideWorldBounds(true);
  clothes.body.offset.y = 7;
  clothes.scale = 2;
  clothes.depth = 3;

  clothes.anims.play("jin_clothes_left");

  const hair = scene.physics.add
    .sprite(jin.x, jin.y, `jin_hair_left`)
    .setScale(2);

  scene.data.set("jin_hair", hair);
  hair.body.immovable = true;
  hair.setCollideWorldBounds(true);
  hair.body.offset.y = 7;
  hair.scale = 1.95;
  hair.depth = 4;

  hair.anims.play("jin_hair_left");

  return jin;
};
