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
