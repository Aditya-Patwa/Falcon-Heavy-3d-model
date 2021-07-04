const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createFalconHeavyFairing = () => {
    const falconHeavyFairingPath = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(5, 0, 0),
        new BABYLON.Vector3(6, 2, 0),
        new BABYLON.Vector3(6, 20, 0)
    ];

    const falconHeavyFairingTop = new BABYLON.MeshBuilder.CreateCapsule("falconHeavyFairingTop", { radius: 6, height: 17, radiusTop: 3 })
    falconHeavyFairingTop.position.y = 24;
    const falconHeavyFairingBottom = new BABYLON.MeshBuilder.CreateLathe("falconHeavyFairingBottom", { shape: falconHeavyFairingPath, sideOrientation: BABYLON.Mesh.DOUBLESIDE });
    const falconHeavyFairing = new BABYLON.Mesh.MergeMeshes([falconHeavyFairingTop, falconHeavyFairingBottom], true, false, null, false, true);

    return falconHeavyFairing;
};

const createFalconHeavySeparator = () => {
    const falconHeavySeparator = new BABYLON.MeshBuilder.CreateCylinder("falconHeavySeparator", {height: 1, diameter: 7.75});
    return falconHeavySeparator;
};

const createFalconHeavyEngine = () => {
    const falconHeavyEngineBottomPath = [
        new BABYLON.Vector3(5, 0, 0),
        new BABYLON.Vector3(2, 10, 0)
    ];

    const falconHeavyEngineBottom = new BABYLON.MeshBuilder.CreateLathe("falconHeavyEngineBottom",{ shape: falconHeavyEngineBottomPath, sideOrientation: BABYLON.Mesh.DOUBLESIDE });
    const falconHeavyEngineBottomMat = new BABYLON.StandardMaterial("falconHeavyEngineBottomColor");
    falconHeavyEngineBottomMat.diffuseColor = new BABYLON.Color3(75/255, 75/255, 75/255);
    falconHeavyEngineBottom.material = falconHeavyEngineBottomMat;

    const falconHeavyEngineTop = new BABYLON.MeshBuilder.CreateCylinder("falconHeavyEngineTop", {height: 3, diameter: 6});
    falconHeavyEngineTop.parent = falconHeavyEngineBottom;
    falconHeavyEngineTop.position.y = 10;
    const falconHeavyEngineTopMat = new BABYLON.StandardMaterial("falconHeavyEngineTopColor");
    falconHeavyEngineTopMat.diffuseColor = new BABYLON.Color3(255/255, 100/255, 100/255);
    falconHeavyEngineTop.material = falconHeavyEngineTopMat;
    // const falconHeavyEngine = new BABYLON.Mesh.MergeMeshes([falconHeavyEngineTop, falconHeavyEngineBottom], true, false, null, false, true);

    return falconHeavyEngineBottom;
};

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(19/255, 19/255, 19/255);

    const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 1.95, 200, new BABYLON.Vector3(0, -30, 0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);

    const falconHeavyFairing = createFalconHeavyFairing();
    const falconHeavyFairingColor = new BABYLON.StandardMaterial("falconHeavyFairingColor");
    falconHeavyFairingColor.diffuseColor = new BABYLON.Color3(1, 1, 1);
    falconHeavyFairing.material = falconHeavyFairingColor;

    const falconHeavyThirdStage = new BABYLON.MeshBuilder.CreateCylinder("falconHeavyThirdStage", {height: 35, diameter: 8});
    falconHeavyThirdStage.position.y = -13.5;
    const firstSeprator = createFalconHeavySeparator();
    const separatorColor = new BABYLON.StandardMaterial("separatorColor");
    separatorColor.diffuseColor = new BABYLON.Color3(0, 0, 0);
    firstSeprator.material = separatorColor;
    firstSeprator.position.y = -31.5;

    const falconHeavySecondStage = new BABYLON.MeshBuilder.CreateCylinder("falconHeavySecondStage", {height: 50, diameter: 8});
    falconHeavySecondStage.position.y = -57;
    // const falconHeavyEngine = createFalconHeavyEngine(); 

    const falconHeavyBooster = new BABYLON.MeshBuilder.CreateCylinder("falconHeavtBooster", {height: 50, diameter: 8});
    falconHeavyBooster.position.y = -57;
    falconHeavyBooster.position.z = -9;
    const falconHeavyBoosterTop = new BABYLON.MeshBuilder.CreateCapsule("falconHeavyBoosterTop", { radius: 4, height: 13, radiusTop: 2 })
    falconHeavyBoosterTop.position.y = -29;
    falconHeavyBoosterTop.position.z = -9;

    const falconHeavySecondBooster = falconHeavyBooster.clone("falconHeavySecondBooster");
    falconHeavySecondBooster.position.y = -57;
    falconHeavySecondBooster.position.z = 9;
    const falconHeavySecondBoosterTop = falconHeavyBoosterTop.clone("falconHeavtSecondBoosterTop")
    falconHeavySecondBoosterTop.position.z = 9;

    const falconHeavyBoosterJoint = new BABYLON.MeshBuilder.CreateCapsule("falconHeavyBosterJoint", {radius: .3, height: 10, radiusTop: .3});
    falconHeavyBoosterJoint.position.y = -40;
    falconHeavyBoosterJoint.position.z = -4.5;

    const falconHeavySecondBoosterJoint = falconHeavyBoosterJoint.clone("falconHeavySecondBoosterJoint");
    falconHeavySecondBoosterJoint.position.z = 4.5;


    const particleSystem = new BABYLON.ParticleSystem("particles", 15000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("assets/textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = new BABYLON.Vector3(0, -73, 0); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(0, .5, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 0, 0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(1, 1, 0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(1, .25, 0, .5);

    // Size of each particle (random between...
    particleSystem.minSize = 1;
    particleSystem.maxSize = 3;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = .25;
    particleSystem.maxLifeTime = 1.25;

    // Emission rate
    particleSystem.emitRate = 1000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-2, -8, 2);
    particleSystem.direction2 = new BABYLON.Vector3(2, -8, -2);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.025;

    // Start the particle system
    particleSystem.start();

    const secondParticleSystem = particleSystem.clone("secondParticleSystem");
    secondParticleSystem.emitter = new BABYLON.Vector3(0, -73, -9)

    const thirdParticleSystem = particleSystem.clone("thirdParticleSystem");
    thirdParticleSystem.emitter = new BABYLON.Vector3(0, -73, 9);

    const showCase = new BABYLON.MeshBuilder.CreateCylinder("showCase", {height: 3, diameter: 8.5})
    showCase.position.y = -33;
    showCase.position.z = -9;
    
    const showCaseMat = new BABYLON.StandardMaterial("showCaseMat");
    showCaseMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    showCase.material = showCaseMat;

    const secondShowCase = showCase.clone("secondShowCase");
    secondShowCase.position.z = 9;

    const options = {
        shape: [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(5, 0, 0),
            new BABYLON.Vector3(0, 5, 0),
            new BABYLON.Vector3(0, 0, 0)
        ],
        path: [
            new BABYLON.Vector3(0, 0, .1),
            new BABYLON.Vector3(5, 0, .1),
            new BABYLON.Vector3(0, 5, .1),
            new BABYLON.Vector3(0, 0, .1)
        ],
        updatable: true,
        cap: BABYLON.Mesh.CAP_ALL,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }

    const falconHeavy = new BABYLON.Mesh.MergeMeshes([falconHeavyFairing, falconHeavyThirdStage, firstSeprator, falconHeavySecondStage, falconHeavyBooster, falconHeavySecondBooster, falconHeavyBoosterTop, falconHeavySecondBoosterTop, falconHeavyBoosterJoint, falconHeavySecondBoosterJoint, showCase, secondShowCase], true, false, null, false, true);
    // falconHeavy.rotation.x = Math.PI / 1.25;
    camera.parent = falconHeavy;

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});