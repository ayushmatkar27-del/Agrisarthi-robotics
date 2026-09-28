/**
 * AgriSarthi 3D Farm Environment Generator (Photorealistic Agricultural Field)
 * Generates an authentic Indian farm field with:
 * - Procedural loamy soil terrain with bump map & plow furrow ridges
 * - Multi-tiered crop foliage with realistic leaf vein textures and fruit nodes
 * - Drip irrigation piping with micro-emitters and moist soil patches
 * - Panoramic atmospheric sky dome with clouds & horizon haze
 * - Distant perimeter tree line & windbreak foliage for deep visual depth
 * - Rustic farm boundary fencing and utility structures
 * - Floating sunbeam atmospheric pollen/dust particles
 */

class FarmEnvironment {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.plants = [];
        this.waypoints = [];
        this.dustParticles = null;

        this.initMaterials();
        this.buildSkyDome();
        this.buildTerrain();
        this.buildCropRows();
        this.buildDripIrrigation();
        this.buildTreeLine();
        this.buildBoundaries();
        this.buildFarmStructures();
        this.buildSunDustFX();
        this.generateWaypoints();

        this.scene.add(this.group);
    }

    initMaterials() {
        const tex = window.TextureGenerator;

        // Realistic Farm Soil Material
        this.matSoil = new THREE.MeshStandardMaterial({
            color: 0x543d2b,
            roughness: 0.95,
            metalness: 0.05,
            map: tex ? tex.createSoilTexture() : null,
            bumpMap: tex ? tex.createSoilBumpMap() : null,
            bumpScale: 0.08
        });

        // Moist Soil around drip emitters
        this.matMoistSoil = new THREE.MeshStandardMaterial({
            color: 0x2b1d14,
            roughness: 0.85,
            metalness: 0.08
        });

        // Crop Foliage with Leaf Vein Texture
        const leafTex = tex ? tex.createLeafTexture() : null;
        this.matLeafHealthy = new THREE.MeshStandardMaterial({
            color: 0x22c55e,
            roughness: 0.45,
            metalness: 0.05,
            map: leafTex,
            side: THREE.DoubleSide
        });

        this.matLeafStressed = new THREE.MeshStandardMaterial({
            color: 0xa3e635, // Yellowish wilt
            roughness: 0.65,
            metalness: 0.05,
            map: leafTex,
            side: THREE.DoubleSide
        });

        this.matLeafDiseased = new THREE.MeshStandardMaterial({
            color: 0xb45309, // Necrotic leaf spots
            roughness: 0.75,
            metalness: 0.05,
            map: leafTex,
            side: THREE.DoubleSide
        });

        this.matStem = new THREE.MeshStandardMaterial({
            color: 0x166534,
            roughness: 0.6
        });

        this.matFruit = new THREE.MeshStandardMaterial({
            color: 0xdc2626,
            roughness: 0.25,
            metalness: 0.1
        });

        this.matWood = new THREE.MeshStandardMaterial({
            color: 0x5c3317,
            roughness: 0.9
        });

        this.matPipe = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.35
        });
    }

    buildSkyDome() {
        const tex = window.TextureGenerator;
        if (!tex) return;

        // Inverted Sky Sphere for seamless 360° atmosphere
        const skyGeom = new THREE.SphereGeometry(120, 32, 24);
        skyGeom.scale(-1, 1, 1);
        const skyMat = new THREE.MeshBasicMaterial({
            map: tex.createSkyDome(),
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeom, skyMat);
        sky.position.y = -10;
        this.group.add(sky);
    }

    buildTerrain() {
        // Main Ground Plane (80m x 80m)
        const groundGeom = new THREE.PlaneGeometry(85, 85, 64, 64);
        groundGeom.rotateX(-Math.PI / 2);

        // Undulating ground contours (farm terrain)
        const pos = groundGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const y = Math.sin(x * 0.12) * 0.10 + Math.cos(z * 0.12) * 0.08 + Math.sin(x * 0.4 + z * 0.4) * 0.03;
            pos.setY(i, y);
        }
        groundGeom.computeVertexNormals();

        const ground = new THREE.Mesh(groundGeom, this.matSoil);
        ground.receiveShadow = true;
        this.group.add(ground);

        // Raised Soil Beds / Furrows
        const rowZPositions = [-9, -4.5, 0, 4.5, 9];
        rowZPositions.forEach(z => {
            const ridgeGeom = new THREE.BoxGeometry(40, 0.18, 1.5);
            const ridge = new THREE.Mesh(ridgeGeom, this.matMoistSoil);
            ridge.position.set(0, 0.07, z);
            ridge.receiveShadow = true;
            this.group.add(ridge);
        });

        // Farm Tractor Path
        const pathGeom = new THREE.BoxGeometry(3.0, 0.02, 38);
        const path = new THREE.Mesh(pathGeom, new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.95 }));
        path.position.set(-21, 0.03, 0);
        path.receiveShadow = true;
        this.group.add(path);
    }

    buildCropRows() {
        const rowZPositions = [-9, -4.5, 0, 4.5, 9];
        const plantsPerRow = 26;
        const rowLength = 38;
        const startX = -rowLength / 2;

        rowZPositions.forEach((rowZ, rowIndex) => {
            for (let i = 0; i < plantsPerRow; i++) {
                const plantX = startX + (i / (plantsPerRow - 1)) * rowLength + (Math.random() - 0.5) * 0.25;
                const plantZ = rowZ + (Math.random() - 0.5) * 0.22;

                let healthState = 'healthy';
                // Row 1 hotspot has water stress
                if (rowIndex === 1 && plantX > 3 && plantX < 12) {
                    healthState = 'water_stress';
                }
                // Row 3 hotspot has leaf spot
                else if (rowIndex === 3 && plantX > -12 && plantX < -3) {
                    healthState = 'leaf_disease';
                }

                this.createPlant(plantX, plantZ, healthState, rowIndex);
            }
        });
    }

    createPlant(x, z, healthState, rowId) {
        const plantGroup = new THREE.Group();
        plantGroup.position.set(x, 0.14, z);

        const scale = 0.9 + Math.random() * 0.35;
        plantGroup.scale.set(scale, scale, scale);

        // Main Plant Stem
        const stemGeom = new THREE.CylinderGeometry(0.028, 0.045, 1.25, 8);
        const stem = new THREE.Mesh(stemGeom, this.matStem);
        stem.position.y = 0.62;
        stem.castShadow = true;
        plantGroup.add(stem);

        // Select leaf material
        let leafMat = this.matLeafHealthy;
        if (healthState === 'water_stress') leafMat = this.matLeafStressed;
        if (healthState === 'leaf_disease') leafMat = this.matLeafDiseased;

        // Multi-tiered foliage leaves
        const leafGeom = new THREE.PlaneGeometry(0.45, 0.22, 4, 2);
        // Curve leaf slightly
        const leafPos = leafGeom.attributes.position;
        for (let k = 0; k < leafPos.count; k++) {
            const lx = leafPos.getX(k);
            leafPos.setZ(k, -Math.abs(lx) * 0.08);
        }
        leafGeom.computeVertexNormals();

        const numLeaves = 10;
        for (let j = 0; j < numLeaves; j++) {
            const angle = (j / numLeaves) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
            const height = 0.35 + (j / numLeaves) * 0.75;
            const leaf = new THREE.Mesh(leafGeom, leafMat);
            leaf.position.set(Math.cos(angle) * 0.24, height, Math.sin(angle) * 0.24);
            leaf.rotation.y = angle;
            leaf.rotation.z = 0.32 + Math.random() * 0.15;
            leaf.castShadow = true;
            plantGroup.add(leaf);
        }

        // Add crop fruits / nodes to healthy plants
        if (healthState === 'healthy' && Math.random() > 0.35) {
            const fruitGeom = new THREE.SphereGeometry(0.07, 10, 10);
            const fruit = new THREE.Mesh(fruitGeom, this.matFruit);
            fruit.position.set(0.12, 0.72, 0.1);
            fruit.castShadow = true;
            plantGroup.add(fruit);
        }

        plantGroup.userData = {
            type: 'crop',
            health: healthState,
            row: rowId,
            worldX: x,
            worldZ: z
        };

        this.plants.push(plantGroup);
        this.group.add(plantGroup);
    }

    buildDripIrrigation() {
        const rowZPositions = [-9, -4.5, 0, 4.5, 9];
        rowZPositions.forEach(z => {
            const pipeGeom = new THREE.CylinderGeometry(0.016, 0.016, 39);
            pipeGeom.rotateZ(Math.PI / 2);
            const pipe = new THREE.Mesh(pipeGeom, this.matPipe);
            pipe.position.set(0, 0.15, z + 0.35);
            this.group.add(pipe);

            // Drip Emitters & Moist Ground Circles
            for (let x = -17; x <= 17; x += 2.8) {
                const emitter = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03), this.matWood);
                emitter.position.set(x, 0.16, z + 0.35);
                this.group.add(emitter);

                // Small dark damp spot on soil
                const dampGeom = new THREE.CircleGeometry(0.28, 12);
                dampGeom.rotateX(-Math.PI / 2);
                const damp = new THREE.Mesh(dampGeom, this.matMoistSoil);
                damp.position.set(x, 0.075, z + 0.35);
                this.group.add(damp);
            }
        });
    }

    buildTreeLine() {
        // Distant windbreak tree line along horizon for realistic depth
        const treeGroup = new THREE.Group();
        const treeCount = 28;

        for (let i = 0; i < treeCount; i++) {
            const x = -38 + (i / treeCount) * 76 + (Math.random() - 0.5) * 2;
            const z = -32 - Math.random() * 4;

            const trunkGeom = new THREE.CylinderGeometry(0.18, 0.25, 2.5, 6);
            const trunk = new THREE.Mesh(trunkGeom, this.matWood);
            trunk.position.set(x, 1.25, z);
            treeGroup.add(trunk);

            // Canopy foliage (stacked green cones)
            const foliageMat = new THREE.MeshStandardMaterial({
                color: (i % 2 === 0) ? 0x14532d : 0x166534,
                roughness: 0.7
            });
            for (let k = 0; k < 3; k++) {
                const coneGeom = new THREE.ConeGeometry(1.6 - k * 0.35, 2.0, 8);
                const cone = new THREE.Mesh(coneGeom, foliageMat);
                cone.position.set(x, 2.6 + k * 1.2, z);
                cone.castShadow = true;
                treeGroup.add(cone);
            }
        }
        this.group.add(treeGroup);
    }

    buildBoundaries() {
        const fenceLength = 56;
        const half = fenceLength / 2;
        const postSpacing = 4.5;

        const sides = [
            { x1: -half, z1: -half, x2: half, z2: -half },
            { x1: half, z1: -half, x2: half, z2: half },
            { x1: half, z1: half, x2: -half, z2: half },
            { x1: -half, z1: half, x2: -half, z2: -half }
        ];

        sides.forEach(s => {
            const dx = s.x2 - s.x1;
            const dz = s.z2 - s.z1;
            const dist = Math.hypot(dx, dz);
            const steps = Math.floor(dist / postSpacing);

            for (let i = 0; i <= steps; i++) {
                const px = s.x1 + (dx / steps) * i;
                const pz = s.z1 + (dz / steps) * i;

                const post = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.075, 1.5, 6), this.matWood);
                post.position.set(px, 0.75, pz);
                post.castShadow = true;
                this.group.add(post);
            }

            // Dual Wire Strands
            [0.6, 1.1].forEach(h => {
                const wireGeom = new THREE.CylinderGeometry(0.005, 0.005, dist);
                wireGeom.rotateX(Math.PI / 2);
                const wire = new THREE.Mesh(wireGeom, this.matPipe);
                wire.position.set((s.x1 + s.x2) / 2, h, (s.z1 + s.z2) / 2);
                wire.rotation.y = Math.atan2(dx, dz);
                this.group.add(wire);
            });
        });
    }

    buildFarmStructures() {
        // Equipment Storage Barn
        const barnGroup = new THREE.Group();
        barnGroup.position.set(-24, 0, -20);

        const walls = new THREE.Mesh(new THREE.BoxGeometry(7, 3.6, 5.5), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 }));
        walls.position.y = 1.8;
        walls.castShadow = true;
        barnGroup.add(walls);

        // Corrugated Metal Roof
        const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 1.8, 4), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.3 }));
        roof.rotateY(Math.PI / 4);
        roof.position.y = 4.4;
        roof.castShadow = true;
        barnGroup.add(roof);
        this.group.add(barnGroup);

        // Solar Charging & LoRa Base Station
        const station = new THREE.Group();
        station.position.set(-23, 0, 18);

        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 5.0), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 }));
        pole.position.y = 2.5;
        station.add(pole);

        const panel = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 1.5), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.15 }));
        panel.position.set(0, 4.8, 0);
        panel.rotation.x = Math.PI / 5;
        station.add(panel);
        this.group.add(station);
    }

    buildSunDustFX() {
        // Floating atmospheric golden dust/pollen motes
        const count = 200;
        const geom = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = Math.random() * 5 + 0.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));

        const mat = new THREE.PointsMaterial({
            color: 0xfef08a,
            size: 0.07,
            transparent: true,
            opacity: 0.55,
            blending: THREE.AdditiveBlending
        });

        this.dustParticles = new THREE.Points(geom, mat);
        this.group.add(this.dustParticles);
    }

    generateWaypoints() {
        this.waypoints = [
            { x: -16, z: -6.75, action: 'patrol' },
            { x: 16, z: -6.75, action: 'scan_end' },
            { x: 18, z: -4.5, action: 'turn' },
            { x: 16, z: -2.25, action: 'patrol' },
            { x: -16, z: -2.25, action: 'scan_end' },
            { x: -18, z: 0, action: 'turn' },
            { x: -16, z: 2.25, action: 'patrol' },
            { x: 16, z: 2.25, action: 'scan_end' },
            { x: 18, z: 4.5, action: 'turn' },
            { x: 16, z: 6.75, action: 'patrol' },
            { x: -16, z: 6.75, action: 'scan_end' },
            { x: -18, z: 0, action: 'return' }
        ];
    }
}

window.FarmEnvironment = FarmEnvironment;
