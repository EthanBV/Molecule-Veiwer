var vseprs = ["Linear", "Trianglular Planar", "Tetrohedral", "Bent", "Triangular Pyramid"];
var orientations = [1, 1, 1, 1, 1];
var bondingLocations = [2, 3, 4, 2, 3];
var bondingMaterial = new BABYLON.StandardMaterial("texture1", scene);
bondingMaterial.alpha = 1;
bondingMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);

function BondingLocation(xAngle, yAngle, zAngle, atom) {
    this.xAngle = xAngle;
    this.yAngle = yAngle;
    this.zAngle = zAngle;
    this.atom = atom;
//     this.phys = BABYLON.Mesh.CreateCylinder("bond", 0.1, 0.2, 0.2, 16, 4, scene, false);
    this.phys = BABYLON.Mesh.CreateSphere('sphere1', 16, 0.2, scene);
    this.phys.material = bondingMaterial;
    this.phys.setPivotMatrix(BABYLON.Matrix.Translation(this.atom.size / 2, 0, 0));
    this.phys.rotate(new BABYLON.Vector3(1, 0, 0), xAngle);
    this.phys.rotate(new BABYLON.Vector3(0, 1, 0), yAngle);
    this.phys.rotate(new BABYLON.Vector3(0, 0, 1), zAngle);
    //     this.phys.rotation.x = xAngle;
    //     this.phys.rotation.y = yAngle;
    //     this.phys.rotation.z = zAngle;
    this.phys.isPickable = false;
}
var normBondingLocationMaterial = new BABYLON.StandardMaterial("texture1", scene);
normBondingLocationMaterial.alpha = 1;
normBondingLocationMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
var selectedBondingLocationMaterial = new BABYLON.StandardMaterial("texture1", scene);
selectedBondingLocationMaterial.alpha = 1;
selectedBondingLocationMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);

function Vsepr(type, atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    this.type = type;
    this.atom = atom;
    this.bondingLocations = [];
    this.bondNum = 0;
    this.selectedBondLocation = 0;
    this.orientation = 0;
    this.shown = true;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.rotation = 0;
    this.update = function() {
        this.atom.physCore.rotation.x = this.originBondAngleX;
        this.atom.physCore.rotation.y = this.originBondAngleY;
        this.atom.physCore.rotation.z = this.originBondAngleZ;
        for(k = 0; k < this.bondingLocations.length; k++) {
            if(k == this.selectedBondLocation) this.bondingLocations[k].phys.material = selectedBondingLocationMaterial;
            else this.bondingLocations[k].phys.material = normBondingLocationMaterial;
        }
    }
    this.show = function() {
        if(!this.shown) {
            for(k = 0; k < this.bondingLocations.length; k++) scene.meshes.push(this.bondingLocations[k].phys);
            this.shown = true;
        }
    }
    this.hide = function() {
        if(this.shown) {
            for(k = 0; k < this.bondingLocations.length; k++) scene.meshes.splice(scene.meshes.indexOf(this.bondingLocations[k].phys), 1);
            this.shown = false;
        }
    }
    this.rotate = function(amount) {
        this.rotation += amount / 180 * Math.PI;
        this.atom.physCore.rotate(anglesToUnitVector(this.bondingLocations[this.config].xAngle, this.bondingLocations[this.config].yAngle, this.bondingLocations[this.config].zAngle), amount / 180 * Math.PI);
    }
    
    this.config = 0;
    this.nextConfig = function(){
        //somethings up here!
        this.atom.physCore.rotate(anglesToUnitVector(this.bondingLocations[this.config].xAngle, this.bondingLocations[this.config].yAngle, this.bondingLocations[this.config].zAngle), -this.rotation);
        this.rotation = 0;
        this.atom.physCore.rotate(new BABYLON.Vector3(1,0,0), this.bondingLocations[this.config].xAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(0,1,0), this.bondingLocations[this.config].yAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(0,0,1), this.bondingLocations[this.config].zAngle);
        this.config++;
        
        if(this.config >= this.bondingLocations.length)this.config = 0;
        this.atom.physCore.rotate(new BABYLON.Vector3(0,0,1), -this.bondingLocations[this.config].zAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(0,1,0), -this.bondingLocations[this.config].yAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(1,0,0), -this.bondingLocations[this.config].xAngle);
    }
    this.dispose = function(){
        this.atom.physCore.rotate(anglesToUnitVector(this.bondingLocations[this.config].xAngle, this.bondingLocations[this.config].yAngle, this.bondingLocations[this.config].zAngle), -this.rotation);

        
        this.atom.physCore.rotate(new BABYLON.Vector3(1,0,0), this.bondingLocations[this.config].xAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(0,1,0), this.bondingLocations[this.config].yAngle);
        this.atom.physCore.rotate(new BABYLON.Vector3(0,0,1), this.bondingLocations[this.config].zAngle);
    }
}

function Linear(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "Linear";
    this.atom = atom;
    this.bondNum = 2;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, Math.PI, 0, atom));
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
Linear.prototype = new Vsepr();

function TriPlane(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "TriPlane";
    this.atom = atom;
    this.bondNum = 3;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, Math.PI * 2 / 3, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, Math.PI * 4 / 3, 0, atom));
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
TriPlane.prototype = new Vsepr();

function Tetrohedral(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "Tetrohedral";
    this.atom = atom;
    this.bondNum = 2;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, -1.9111356, 0, atom));
    this.bondingLocations.push(new BondingLocation(Math.PI * 2 / 3, -1.9111356, 0, atom));
    this.bondingLocations.push(new BondingLocation(Math.PI * 4 / 3, -1.9111356, 0, atom));
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
Tetrohedral.prototype = new Vsepr();

function Bent(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "Bent (120)";
    this.atom = atom;
    this.bondNum = 2;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, 2 * Math.PI / 3, 0, atom));
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
Bent.prototype = new Vsepr();

function Bent2(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "Bent (109.5)";
    this.atom = atom;
    this.bondNum = 2;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(0, 1.9111356, 0, atom));
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
Bent2.prototype = new Vsepr();

function TriPyr(atom, originBondAngleX, originBondAngleY, originBondAngleZ) {
    if(atom.vsepr != null)
        for(i = 0; i < atom.vsepr.bondingLocations.length; i++) {
            scene.meshes.splice(scene.meshes.indexOf(atom.vsepr.bondingLocations[i].phys), 1);
            atom.vsepr.bondingLocations[i].phys.dispose();
        }
    this.type = "TriPyr";
    this.atom = atom;
    this.bondNum = 2;
    this.originBondAngleX = originBondAngleX;
    this.originBondAngleY = originBondAngleY;
    this.originBondAngleZ = originBondAngleZ;
    this.bondingLocations = [];
    this.bondingLocations.push(new BondingLocation(0, 0, 0, atom));
    this.bondingLocations.push(new BondingLocation(Math.PI * 2 / 3, 0, Math.PI * 2 / 3, atom));
    this.bondingLocations.push(new BondingLocation(Math.PI * 4 / 3, 0, Math.PI * 2 / 3, atom));
    
    for(i = 0; i < this.bondingLocations.length; i++) {
        this.bondingLocations[i].phys.parent = this.atom.physCore;
    }
}
TriPyr.prototype = new Vsepr();