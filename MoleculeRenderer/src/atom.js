function Atom() {
    this.name = "";
    this.molecule = null;
    this.phys = null;
    this.physCore = null;
    this.color = "";
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vsepr = null;
    this.orientation = 0;
    this.size = 0;
}
var hydrogenMaterial = new BABYLON.StandardMaterial("texture1", scene);
hydrogenMaterial.alpha = 0.2;
hydrogenMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
var hydrogenMaterialCore = new BABYLON.StandardMaterial("texture1", scene);
hydrogenMaterialCore.alpha = 1;
hydrogenMaterialCore.diffuseColor = new BABYLON.Color3(1, 1, 1);

function Hydrogen(molecule, x, y, z) {
    this.name = "Hydrogen";
    this.molecule = molecule;
    this.color = "WHITE";
    this.phys = BABYLON.Mesh.CreateSphere('atom1', 16, 37 / 50, scene);
    this.phys.isPickable = false;
    this.physCore = BABYLON.Mesh.CreateSphere('atom', 16, 37 / 150, scene);
    this.phys.material = hydrogenMaterial;
    this.physCore.material = hydrogenMaterialCore;
    this.size = 37 / 150;
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function() {
        this.phys.position.x = this.x + this.molecule.x;
        this.phys.position.y = this.y + this.molecule.y;
        this.phys.position.z = this.z + this.molecule.z;
        this.physCore.position.x = this.x + this.molecule.x;
        this.physCore.position.y = this.y + this.molecule.y;
        this.physCore.position.z = this.z + this.molecule.z;
    }
    this.vsepr = new Linear(this, 0, 0, 0);
}
Hydrogen.prototype = new Atom();
var oxygenMaterial = new BABYLON.StandardMaterial("texture1", scene);
oxygenMaterial.alpha = 0.2;
oxygenMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
var oxygenMaterialCore = new BABYLON.StandardMaterial("texture1", scene);
oxygenMaterialCore.alpha = 1;
oxygenMaterialCore.diffuseColor = new BABYLON.Color3(1, 0, 0);

function Oxygen(molecule, x, y, z) {
    this.name = "Oxygen";
    this.molecule = molecule;
    this.color = "RED";
    this.phys = BABYLON.Mesh.CreateSphere('atom1', 16, 73 / 50, scene);
    this.phys.isPickable = false;
    this.physCore = BABYLON.Mesh.CreateSphere('atom', 16, 73 / 150, scene);
    this.phys.material = oxygenMaterial;
    this.physCore.material = oxygenMaterialCore;
    this.size = 73 / 150;
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function() {
        this.phys.position.x = this.x + this.molecule.x;
        this.phys.position.y = this.y + this.molecule.y;
        this.phys.position.z = this.z + this.molecule.z;
        this.physCore.position.x = this.x + this.molecule.x;
        this.physCore.position.y = this.y + this.molecule.y;
        this.physCore.position.z = this.z + this.molecule.z;
    }
    this.vsepr = new TriPlane(this, 0, 0, 0);
}
Oxygen.prototype = new Atom();
var carbonMaterial = new BABYLON.StandardMaterial("texture1", scene);
carbonMaterial.alpha = 0.2;
carbonMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
var carbonMaterialCore = new BABYLON.StandardMaterial("texture1", scene);
// carbonMaterialCore.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/floor.png", scene);
carbonMaterialCore.alpha = 1;
carbonMaterialCore.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);

function Carbon(molecule, x, y, z) {
    this.name = "Carbon";
    this.molecule = molecule;
    this.color = "BLACK";
    this.phys = BABYLON.Mesh.CreateSphere('atom1', 16, 78 / 50, scene);
    this.phys.isPickable = false;
    this.physCore = BABYLON.Mesh.CreateSphere('atom', 16, 78 / 150, scene);
    this.phys.material = carbonMaterial;
    this.physCore.material = carbonMaterialCore;
    this.size = 77 / 150;
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function() {
        this.phys.position.x = this.x + this.molecule.x;
        this.phys.position.y = this.y + this.molecule.y;
        this.phys.position.z = this.z + this.molecule.z;
        this.physCore.position.x = this.x + this.molecule.x;
        this.physCore.position.y = this.y + this.molecule.y;
        this.physCore.position.z = this.z + this.molecule.z;
    }
    this.vsepr = new Linear(this, 0, 0, 0);
}
Carbon.prototype = new Atom();

var nitrogenMaterial = new BABYLON.StandardMaterial("texture1", scene);
nitrogenMaterial.alpha = 0.2;
nitrogenMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 1);
var nitrogenMaterialCore = new BABYLON.StandardMaterial("texture1", scene);
// carbonMaterialCore.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/floor.png", scene);
nitrogenMaterialCore.alpha = 1;
nitrogenMaterialCore.diffuseColor = new BABYLON.Color3(0.7, 0.7, 1);
function Nitrogen(molecule, x, y, z) {
    this.name = "Nitrogen";
    this.molecule = molecule;
    this.color = "BLACK";
    this.phys = BABYLON.Mesh.CreateSphere('atom1', 16, 70 / 50, scene);
    this.phys.isPickable = false;
    this.physCore = BABYLON.Mesh.CreateSphere('atom', 16, 70 / 150, scene);
    this.phys.material = nitrogenMaterial;
    this.physCore.material = nitrogenMaterialCore;
    this.size = 77 / 150;
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function() {
        this.phys.position.x = this.x + this.molecule.x;
        this.phys.position.y = this.y + this.molecule.y;
        this.phys.position.z = this.z + this.molecule.z;
        this.physCore.position.x = this.x + this.molecule.x;
        this.physCore.position.y = this.y + this.molecule.y;
        this.physCore.position.z = this.z + this.molecule.z;
    }
    this.vsepr = new Linear(this, 0, 0, 0);
}
Nitrogen.prototype = new Atom();


var chlorineMaterial = new BABYLON.StandardMaterial("texture1", scene);
chlorineMaterial.alpha = 0.2;
chlorineMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 1);
var chlorineMaterialCore = new BABYLON.StandardMaterial("texture1", scene);
// carbonMaterialCore.diffuseTexture = new BABYLON.Texture("babylon/materialsLibrary/test/textures/floor.png", scene);
chlorineMaterialCore.alpha = 1;
chlorineMaterialCore.diffuseColor = new BABYLON.Color3(0.7, 0.7, 1);
function Chlorine(molecule, x, y, z) {
    this.name = "Chlorine";
    this.molecule = molecule;
    this.color = "BLACK";
    this.phys = BABYLON.Mesh.CreateSphere('atom1', 16, 99 / 50, scene);
    this.phys.isPickable = false;
    this.physCore = BABYLON.Mesh.CreateSphere('atom', 16, 99 / 150, scene);
    this.phys.material = chlorineMaterial;
    this.physCore.material = chlorineMaterialCore;
    this.size = 77 / 150;
    this.x = x;
    this.y = y;
    this.z = z;
    this.update = function() {
        this.phys.position.x = this.x + this.molecule.x;
        this.phys.position.y = this.y + this.molecule.y;
        this.phys.position.z = this.z + this.molecule.z;
        this.physCore.position.x = this.x + this.molecule.x;
        this.physCore.position.y = this.y + this.molecule.y;
        this.physCore.position.z = this.z + this.molecule.z;
    }
    this.vsepr = new Linear(this, 0, 0, 0);
}
Chlorine.prototype = new Atom();