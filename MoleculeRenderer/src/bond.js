function Bond(molecule, atom1, atom2) {
    this.name = "";
    this.phys = BABYLON.Mesh.CreateCylinder("bond", 4, 2, 2, 16, 4, scene, false);
    this.length = null;
    this.molecule = molecule;
    this.atom1 = atom1;
    this.atom2 = atom2;
    this.update = function() {
        this.phys.dispose();
        var height = Math.sqrt(Math.sqrt((this.atom1.x - this.atom2.x) * (this.atom1.x - this.atom2.x) + (this.atom1.z - this.atom2.z) * (this.atom1.z - this.atom2.z)) * Math.sqrt((this.atom1.x - this.atom2.x) * (this.atom1.x - this.atom2.x) + (this.atom1.z - this.atom2.z) * (this.atom1.z - this.atom2.z)) + (this.atom1.y - this.atom2.y) * (this.atom1.y - this.atom2.y));
        this.length = height;
        var width = 0.1;
        this.phys = BABYLON.Mesh.CreateCylinder("bond", height, width, width, 16, 4, scene, false);
        this.phys.position.x = (this.atom1.x + this.atom2.x) / 2 + this.molecule.x;
        this.phys.position.z = (this.atom1.z + this.atom2.z) / 2 + this.molecule.z;
        this.phys.position.y = (this.atom1.y + this.atom2.y) / 2 + this.molecule.y;
        var sideAngle = Math.atan2(this.atom1.x - this.atom2.x, this.atom1.z - this.atom2.z);
        var horizontalChange = Math.sqrt((this.atom1.x - this.atom2.x) * (this.atom1.x - this.atom2.x) + (this.atom1.z - this.atom2.z) * (this.atom1.z - this.atom2.z))
        var upAngle = Math.atan2(horizontalChange, this.atom1.y - this.atom2.y);
        this.phys.rotation.y = sideAngle;
        this.phys.rotation.x = upAngle;
    }
    this.update();
}