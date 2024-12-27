const level1 = new Level(
   [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new Background(airImage, -719),
        new Background(backgroundImages[3], -719),
        new Background(backgroundImages[4], -719),
        new Background(backgroundImages[5], -719), 
        new Background(airImage, 0),
        new Background(backgroundImages[0], 0),
        new Background(backgroundImages[1], 0),
        new Background(backgroundImages[2], 0),
        new Background(airImage, 719),
        new Background(backgroundImages[3], 719),
        new Background(backgroundImages[4], 719),
        new Background(backgroundImages[5], 719),
        new Background(airImage, 719*2),
        new Background(backgroundImages[0], 719*2),
        new Background(backgroundImages[1], 719*2),
        new Background(backgroundImages[2], 719*2), 
        new Background(airImage, 719*3),
        new Background(backgroundImages[3], 719*3),
        new Background(backgroundImages[4], 719*3),
        new Background(backgroundImages[5], 719*3), 
    ]
)