
var bondLengthIndexes = ["Hydrogen", "Carbon", "Oxygen", "Nitrogen", "Chlorine", "Sulphur", "Phosphorus"]
var bondLengths = [
    [74, 109, 96, 101, 127, 134, 142],
    [109, 154, 143, 147, 177, 181, 187],
    [96, 143, 148, 144, 164, 151, 160],
    [101, 147, 144, 146, 191, 176, 177],
    [127, 177, 164, 191, 199, 201, 204],
    [134, 181, 151, 176, 201, 204, 207],
    [142, 187, 160, 177, 204, 207, 221],
];

function getBondLength(atom1, atom2){
    return bondLengths[bondLengthIndexes.indexOf(atom1)][bondLengthIndexes.indexOf(atom2)];
}

    function Molecule() {
        this.name = name;
        this.atoms = [];
        this.bonds = [];
        this.refresh = true;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.update = function() {
            for(e = 0; e < this.atoms.length; e++) {
                this.atoms[e].vsepr.hide();
                if(selectedObject == this.atoms[e].physCore) {
                    ctx.fillText(this.atoms[e].name, 0, 20);
                    selectedAtom = this.atoms[e];
                    this.atoms[e].vsepr.show();
                    this.atoms[e].vsepr.update();
                }
            }
            for(e = 0; e < this.bonds.length; e++) {
                if(selectedObject == this.bonds[e].phys) {
                    ctx.fillText(this.bonds[e].atom1.name + " bonded to " + this.bonds[e].atom2.name, 0, 20);
                }
            }
            if(this.refresh) {
                //code to update all bonds and atoms
                for(e = 0; e < this.atoms.length; e++) {
                    this.atoms[e].update();
                }
                for(e = 0; e < this.bonds.length; e++) {
                    this.bonds[e].update();
                }
                this.refresh = false;
            }
        }
    }

    function getPosFrom(atom1, atom2, bondLength, angleX, angleY) {
        var xOff, zOff, yOff;
        yOff = Math.sin(angleY) * bondLength;
        xOff = Math.cos(angleX) * (Math.cos(angleY) * bondLength);
        zOff = Math.sin(angleX) * (Math.cos(angleY) * bondLength);
        atom2.x = atom1.x + xOff;
        atom2.z = atom1.z + zOff;
        atom2.y = atom1.y + yOff;
    }

    function Water(x, y, z) {
        this.name = "water";
        this.x = x;
        this.y = y;
        this.z = z;
        this.atoms.push(new Oxygen(this, 0, 0, 0));
        this.atoms.push(new Hydrogen(this, 0, 0, 0));
        getPosFrom(this.atoms[0], this.atoms[1], bondLengths[2][0] / 100, Math.PI / 4, Math.PI / 4);
        this.atoms.push(new Hydrogen(this, 0, 0, 0));;
        getPosFrom(this.atoms[0], this.atoms[2], bondLengths[2][0] / 100, -Math.PI / 4, Math.PI / 4);
        this.bonds.push(new Bond(this, this.atoms[0], this.atoms[1]));
        this.bonds.push(new Bond(this, this.atoms[0], this.atoms[2]));
    }
Water.prototype = new Molecule();

function Sucrose(x, y, z) {
    this.name = "sucrose";
    this.x = x;
    this.y = y;
    this.z = z;
    this.atoms.push(new Hydrogen(this, 0, 0, 0));
    this.atoms.push(new Oxygen(this, 0, 0, 0));
    getPosFrom(this.atoms[0], this.atoms[1], bondLengths[0][2] / 100, Math.PI, 0);
    this.atoms.push(new Carbon(this, 0, 0, 0));
    getPosFrom(this.atoms[1], this.atoms[2], bondLengths[2][1] / 100, Math.PI / 2, 0);
    this.atoms.push(new Hydrogen(this, 0, 0, 0));
    getPosFrom(this.atoms[2], this.atoms[3], bondLengths[0][1] / 100, Math.PI / 6, -Math.PI / 6);
    this.atoms.push(new Hydrogen(this, 0, 0, 0));
    getPosFrom(this.atoms[2], this.atoms[4], bondLengths[0][1] / 100, 5 * Math.PI / 6, -Math.PI / 6);
    this.atoms.push(new Carbon(this, 0, 0, 0));
    getPosFrom(this.atoms[2], this.atoms[5], bondLengths[1][1] / 100, Math.PI / 2, Math.PI / 3);
    this.bonds.push(new Bond(this, this.atoms[0], this.atoms[1]));
    this.bonds.push(new Bond(this, this.atoms[1], this.atoms[2]));
    this.bonds.push(new Bond(this, this.atoms[2], this.atoms[3]));
    this.bonds.push(new Bond(this, this.atoms[2], this.atoms[4]));
    this.bonds.push(new Bond(this, this.atoms[2], this.atoms[5]));
    this.atoms[5].vsepr.originBondAngleX = this.bonds[4].phys.rotation.z;
    this.atoms[5].vsepr.originBondAngleY = this.bonds[4].phys.rotation.y + Math.PI / 2;
    this.atoms[5].vsepr.originBondAngleZ = this.bonds[4].phys.rotation.x + Math.PI / 2;
    this.atoms[4].vsepr.originBondAngleX = this.bonds[3].phys.rotation.z;
    this.atoms[4].vsepr.originBondAngleY = this.bonds[3].phys.rotation.y + Math.PI / 2;
    this.atoms[4].vsepr.originBondAngleZ = this.bonds[3].phys.rotation.x + Math.PI / 2;
    this.atoms[3].vsepr.originBondAngleX = this.bonds[2].phys.rotation.z;
    this.atoms[3].vsepr.originBondAngleY = this.bonds[2].phys.rotation.y + Math.PI / 2;
    this.atoms[3].vsepr.originBondAngleZ = this.bonds[2].phys.rotation.x + Math.PI / 2;
    this.atoms[2].vsepr.originBondAngleX = this.bonds[1].phys.rotation.z - Math.PI / 2;
    this.atoms[2].vsepr.originBondAngleY = this.bonds[1].phys.rotation.y + Math.PI / 2;
    this.atoms[2].vsepr.originBondAngleZ = this.bonds[1].phys.rotation.x + Math.PI / 2;
    this.atoms[1].vsepr.originBondAngleX = this.bonds[0].phys.rotation.z;
    this.atoms[1].vsepr.originBondAngleY = this.bonds[0].phys.rotation.y + Math.PI / 2;
    this.atoms[1].vsepr.originBondAngleZ = this.bonds[0].phys.rotation.x + Math.PI / 2;
}
Sucrose.prototype = new Molecule();

function Capsaicin(x,y,z){
    this.atoms.push(new Carbon(this,0,0,0));
    this.atoms.push(new Carbon(this,0,0,0));
    getPosFrom(this.atoms[0], this.atoms[1], bondLengths[1][1] / 100, 0, 0);
    this.atoms.push(new Carbon(this,0,0,0));
    getPosFrom(this.atoms[1], this.atoms[2], bondLengths[1][1] / 100, Math.PI/3, 0);
    this.atoms.push(new Carbon(this,0,0,0));
    getPosFrom(this.atoms[2], this.atoms[3], bondLengths[1][1] / 100, Math.PI*2/3, 0);
    this.atoms.push(new Carbon(this,0,0,0));
    getPosFrom(this.atoms[3], this.atoms[4], bondLengths[1][1] / 100, Math.PI*3/3, 0);
    this.atoms.push(new Carbon(this,0,0,0));
    getPosFrom(this.atoms[4], this.atoms[5], bondLengths[1][1] / 100, Math.PI*4/3, 0);
    this.atoms.push(new Oxygen(this,0,0,0))
    getPosFrom(this.atoms[0], this.atoms[6], bondLengths[1][2] / 100, Math.PI*4/3, 0);
    this.atoms.push(new Carbon(this,0,0,0))
    getPosFrom(this.atoms[6], this.atoms[7], bondLengths[1][2] / 100, Math.PI, 0);
    this.atoms.push(new Oxygen(this,0,0,0))
    getPosFrom(this.atoms[1], this.atoms[8], bondLengths[1][2] / 100, Math.PI*5/3, 0);
    this.atoms.push(new Carbon(this,0,0,0))
    getPosFrom(this.atoms[4], this.atoms[9], bondLengths[1][1] / 100, Math.PI*2/3, 0);
    this.atoms.push(new Nitrogen(this,0,0,0))
    getPosFrom(this.atoms[9], this.atoms[10], bondLengths[1][3] / 100, Math.PI*2/3, Math.PI-1.9111355);
    this.atoms.push(new Carbon(this,0,0,0))
    getPosFrom(this.atoms[10], this.atoms[11], bondLengths[1][3] / 100, -Math.PI*2/3, (Math.PI-1.9111355)/2);
    this.atoms.push(new Oxygen(this,0,0,0))
    getPosFrom(this.atoms[11], this.atoms[12], bondLengths[1][2] / 100, Math.PI*3/3, (-1.9111355)/4);
    this.atoms.push(new Carbon(this,0,0,0))
    getPosFrom(this.atoms[11], this.atoms[13], bondLengths[1][1] / 100, Math.PI*2/3, (Math.PI-1.9111355));
    
    this.bonds.push(new Bond(this, this.atoms[0], this.atoms[1]));
    this.bonds.push(new Bond(this, this.atoms[1], this.atoms[2]));
    this.bonds.push(new Bond(this, this.atoms[2], this.atoms[3]));
    this.bonds.push(new Bond(this, this.atoms[3], this.atoms[4]));
    this.bonds.push(new Bond(this, this.atoms[4], this.atoms[5]));
    this.bonds.push(new Bond(this, this.atoms[5], this.atoms[0]));
    this.bonds.push(new Bond(this, this.atoms[0], this.atoms[6]));
    this.bonds.push(new Bond(this, this.atoms[6], this.atoms[7]));
    this.bonds.push(new Bond(this, this.atoms[1], this.atoms[8]));
    this.bonds.push(new Bond(this, this.atoms[4], this.atoms[9]));
    this.bonds.push(new Bond(this, this.atoms[9], this.atoms[10]));
    this.bonds.push(new Bond(this, this.atoms[10], this.atoms[11]));
    this.bonds.push(new Bond(this, this.atoms[11], this.atoms[12]));
    this.bonds.push(new Bond(this, this.atoms[11], this.atoms[13]));
    
    
    this.atoms[0].vsepr.originBondAngleX = Math.PI/3;
    this.atoms[0].vsepr.originBondAngleY = Math.PI/2;
    this.atoms[0].vsepr.originBondAngleZ = Math.PI/4;
}
Capsaicin.prototype = new Molecule();

function BlankMolecule(x, y, z) {
    this.name = "new molecule";
    this.x = x;
    this.y = y;
    this.z = z;
    this.atoms.push(new Carbon(this, 0, 0, 0));
    this.atoms[0].vsepr.originBondAngleX = 0;
    this.atoms[0].vsepr.originBondAngleY = 0;
}
BlankMolecule.prototype = new Molecule();