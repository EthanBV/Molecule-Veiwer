var activeEditor = null;
var selectedAtom = null;

function updateEditor() {
    if(editorOpen && selectedAtom != null) {
        if(activeEditor == null) {
            activeEditor = new Editor(selectedAtom);
        }
        activeEditor.update();
        activeEditor.draw();
    } else {
        if(activeEditor != null) activeEditor = null;
    }
}

function Editor(atom) {
    this.atom = atom;
    this.menuId = 0;
    this.selectedOption = 0;
    this.menuMaxOptions = 3;
    this.selectCoolDown = 0;
    this.menus = ["Main Menu", "Vsepr", "Reconfigure", "SelectBond", "SelectAtom"];
    this.menuOptions = [
        ["Vespr", "Bond", "Close"],
        ["Linear", "Triangular Planar", "Tetrohedral", "Bent (120)", "Bent (109.5)", "Triangular Pyramid", "Reconfigure", "Back"],
        ["Next Rotation", "Previous Rotation", "Next Layout", "Previous Layout", "Done"],
        ["Next Bond", "Previous Bond", "Add Atom", "Back"],
        ["Hydrogen", "Carbon", "Oxygen", "Nitrogen", "Chlorine", "Sulphur", "Phosphorus", "Back", "None"]
    ]
    this.update = function() {
        if(keys[38] && this.selectCoolDown <= 0) {
            this.selectedOption--;
            if(this.selectedOption < 0) this.selectedOption = this.menuMaxOptions - 1;
            this.selectCoolDown = 15;
        } else if(keys[40] && this.selectCoolDown <= 0) {
            this.selectedOption++;
            if(this.selectedOption >= this.menuMaxOptions) this.selectedOption = 0;
            this.selectCoolDown = 15;
        }
        var action = "none";
        if(keys[13] && this.selectCoolDown <= 0) {
            action = this.menuOptions[this.menuId][this.selectedOption];
            this.selectCoolDown = 15;
        }
        if(this.selectCoolDown > 0) this.selectCoolDown--;
        switch(action) {
            case "Close":
                editorOpen = false;
                selectedObject = null;
                break;
            case "Vespr":
                this.menuId = 1;
                this.menuMaxOptions = 8;
                this.selectedOption = 0;
                break;
            case "Bond":
                this.menuId = 3;
                this.menuMaxOptions = 4;
                this.selectedOption = 0;
                break;
            case "Linear":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new Linear(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Triangular Planar":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new TriPlane(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Tetrohedral":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new Tetrohedral(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Bent (120)":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new Bent(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Bent (109.5)":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new Bent2(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Triangular Pyramid":
                this.atom.vsepr.dispose();
                this.atom.vsepr = new TriPyr(this.atom, this.atom.vsepr.originBondAngleX, this.atom.vsepr.originBondAngleY, this.atom.vsepr.originBondAngleZ);
                break;
            case "Reconfigure":
                this.menuId = 2;
                this.menuMaxOptions = 5;
                this.selectedOption = 0;
                break;
            case "Next Rotation":
                this.atom.vsepr.rotate(5);
                break;
            case "Previous Rotation":
                this.atom.vsepr.rotate(-5);
                break;
            case "Next Layout":
                this.atom.vsepr.nextConfig();
                break;
            case "Previous Layout":
                this.atom.vsepr.nextConfig();
                break;
            case "Next Bond":
                this.atom.vsepr.selectedBondLocation++;
                if(this.atom.vsepr.selectedBondLocation >= this.atom.vsepr.bondingLocations.length)this.atom.vsepr.selectedBondLocation = 0;
                break;
            case "Previous Bond":
                this.atom.vsepr.selectedBondLocation--;
                if(this.atom.vsepr.selectedBondLocation < 0)this.atom.vsepr.selectedBondLocation = this.atom.vsepr.bondingLocations.length - 1;
                break;
            case "None":
                break;
            case "Hydrogen":
                this.addAtom("Hydrogen");
                break;
            case "Carbon":
                this.addAtom("Carbon");
                break;
            case "Oxygen":
                this.addAtom("Oxygen");
                break;
            case "Nitrogen":
                this.addAtom("Nitrogen");
                break;
            case "Chlorine":
                this.addAtom("Chlorine");
                break;
            case "Sulphur":
                this.addAtom("Sulphur");
                break;
            case "Phosphorus":
                this.addAtom("Phosphorus");
                break;
            case "Back":
                if(this.menuId == 1) {
                    this.menuId = 0;
                    this.menuMaxOptions = 3;
                } else if(this.menuId == 4) {
                    this.menuId = 3;
                    this.menuMaxOptions = 4;
                } else if(this.menuId == 3) {
                    this.menuId = 0;
                    this.menuMaxOptions = 3;
                }
                this.selectedOption = 0;
                break;
            case "Done":
                this.menuId = 1;
                this.menuMaxOptions = 8
                this.selectedOption = 0;
                break;
            case "Add Atom":
                this.menuId = 4;
                this.menuMaxOptions = 8;
                this.selectedOption = 0;
                break;
        }
    }
    this.draw = function() {
        ctx.fillStyle = "rgb(155,155,175)";
        ctx.strokeStyle = "rgb(100,100,110)";;
        ctx.beginPath();
        ctx.rect(hudCanvas.width - 200, 0, 200, this.menuMaxOptions * 40);
        for(i = 1; i < this.menuMaxOptions; i++) {
            ctx.moveTo(hudCanvas.width - 200, 40 * i);
            ctx.lineTo(hudCanvas.width, 40 * i);
        }
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgb(200,200,210)";
        ctx.beginPath();
        ctx.rect(hudCanvas.width - 200, (this.selectedOption) * 40, 200, 40);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgb(50,50,60)";
        for(i = 0; i < this.menuMaxOptions; i++) {
            ctx.fillText(this.menuOptions[this.menuId][i], hudCanvas.width - 195, i * 40 + 30);
        }
    }
    
    this.addAtom = function(type){
        var a;
        var distance = bondLengths[bondLengthIndexes.indexOf(this.atom.name)][bondLengthIndexes.indexOf(type)]/100;
        
        console.log(xAngle + ", " + yAngle + ", " + zAngle);
        
        switch(type){
            case "Hydrogen":
                a = new Hydrogen(this.atom.molecule,0,0,0);
                break;
            case "Oxygen":
                a = new Oxygen(this.atom.molecule,0,0,0);
                break;
            case "Carbon":
                a = new Carbon(this.atom.molecule,0,0,0);
                break;
            case "Nitrogen":
                a = new Nitrogen(this.atom.molecule,0,0,0);
                break;
            case "Chlorine":
                a = new Chlorine(this.atom.molecule,0,0,0);
                break;
            case "Sulphur":
                a = new Sulphur(this.atom.molecule,0,0,0);
                break;
            case "Phosphorus":
                a = new Phosphorus(this.atom.molecule,0,0,0);
                break;
        }
        
        //TRY CHANGE ORDERING OF ROTATIONS
        var x, y, z;
        var tx, ty, tz;
        x = distance;
        y = 0;
        z = 0;
        var xAngle, yAngle, zAngle;
        
        //ROTATE FOR BONDING LOCATION ANGLE - IT WORKS 100%
        xAngle = this.atom.vsepr.bondingLocations[this.atom.vsepr.selectedBondLocation].xAngle;
        yAngle = this.atom.vsepr.bondingLocations[this.atom.vsepr.selectedBondLocation].yAngle;
        zAngle = this.atom.vsepr.bondingLocations[this.atom.vsepr.selectedBondLocation].zAngle;
        
        
        //rotate around z axis
        tx = x*Math.cos(zAngle) - y*Math.sin(zAngle);
        ty = x*Math.sin(zAngle) + y*Math.cos(zAngle);
        x = tx;
        y = ty;
        //rotate around y axis
        tz = z*Math.cos(yAngle) - x*Math.sin(yAngle);
        tx = z*Math.sin(yAngle) + x*Math.cos(yAngle);
        z = tz;
        x = tx;
        //rotate around x axis
        ty = y*Math.cos(xAngle) - z*Math.sin(xAngle);
        tz = y*Math.sin(xAngle) + z*Math.cos(xAngle);
        y = ty;
        z = tz;
        
        //NOW ROTATE FOR THE COFIG - IT WORKS 100%
        xAngle = -this.atom.vsepr.bondingLocations[this.atom.vsepr.config].xAngle;
        yAngle = -this.atom.vsepr.bondingLocations[this.atom.vsepr.config].yAngle;
        zAngle = -this.atom.vsepr.bondingLocations[this.atom.vsepr.config].zAngle;
        
        
        //rotate around x axis
        ty = y*Math.cos(xAngle) - z*Math.sin(xAngle);
        tz = y*Math.sin(xAngle) + z*Math.cos(xAngle);
        y = ty;
        z = tz;
        //rotate around y axis
        tz = z*Math.cos(yAngle) - x*Math.sin(yAngle);
        tx = z*Math.sin(yAngle) + x*Math.cos(yAngle);
        z = tz;
        x = tx;
        //rotate around z axis
        tx = x*Math.cos(zAngle) - y*Math.sin(zAngle);
        ty = x*Math.sin(zAngle) + y*Math.cos(zAngle);
        x = tx;
        y = ty;
        
        //NOW ROTATE FOR TRANS - IT WORKS 100%
        xAngle = this.atom.vsepr.rotation;
        
        //rotate around x axis
        ty = y*Math.cos(xAngle) - z*Math.sin(xAngle);
        tz = y*Math.sin(xAngle) + z*Math.cos(xAngle);
        y = ty;
        z = tz;
        
        
        
        //NOW ROTATE FOR ORIGIN BOND ANGLE - IT WORKS 100%
        xAngle = this.atom.physCore.rotation.x;
        yAngle = this.atom.physCore.rotation.y;
        zAngle = this.atom.physCore.rotation.z;
        
        //rotate around z axis
        tx = x*Math.cos(zAngle) - y*Math.sin(zAngle);
        ty = x*Math.sin(zAngle) + y*Math.cos(zAngle);
        x = tx;
        y = ty;
        //rotate around x axis
        ty = y*Math.cos(xAngle) - z*Math.sin(xAngle);
        tz = y*Math.sin(xAngle) + z*Math.cos(xAngle);
        y = ty;
        z = tz;
        //rotate around y axis
        tz = z*Math.cos(yAngle) - x*Math.sin(yAngle);
        tx = z*Math.sin(yAngle) + x*Math.cos(yAngle);
        z = tz;
        x = tx;
        
        
        
        
        
        
        
        
        
        //set position
        a.x = x+this.atom.x;
        a.y = y+this.atom.y;
        a.z = z+this.atom.z;
//        zAngle * VAR = 0
        this.atom.molecule.atoms.push(a);
        this.atom.molecule.bonds.push(new Bond(this.atom.molecule, this.atom, a));
        
        a.vsepr.originBondAngleX = this.atom.molecule.bonds[this.atom.molecule.bonds.length-1].phys.rotation.z;
        a.vsepr.originBondAngleY = this.atom.molecule.bonds[this.atom.molecule.bonds.length-1].phys.rotation.y + Math.PI / 2;
        a.vsepr.originBondAngleZ = this.atom.molecule.bonds[this.atom.molecule.bonds.length-1].phys.rotation.x + Math.PI / 2;
        
        this.atom.molecule.refresh = true;
    }
}

function anglesToUnitVector(xAngle, yAngle,zAngle){
    var x,y,z;
    x = 1;
    y = 0;
    z = 0;
    var tx, ty, tz;
        //rotate around z axis
        tx = x*Math.cos(zAngle) - y*Math.sin(zAngle);
        ty = x*Math.sin(zAngle) + y*Math.cos(zAngle);
        x = tx;
        y = ty;
        //rotate around y axis
        tz = z*Math.cos(yAngle) - x*Math.sin(yAngle);
        tx = z*Math.sin(yAngle) + x*Math.cos(yAngle);
        z = tz;
        x = tx;
        //rotate around x axis
        ty = y*Math.cos(xAngle) - z*Math.sin(xAngle);
        tz = y*Math.sin(xAngle) + z*Math.cos(xAngle);
        y = ty;
        z = tz;
//     x = (0*Math.sin(yAngle)+1*Math.cos(yAngle))*Math.cos(zAngle)-0*Math.sin(zAngle);
//     y = ((0*Math.sin(yAngle)+1*Math.cos(yAngle))*Math.sin(zAngle)+0*Math.cos(zAngle))*Math.cos(xAngle)-(0*Math.cos(yAngle)-1*Math.sin(yAngle))*Math.sin(xAngle);
//     z = ((0*Math.sin(yAngle)+1*Math.cos(yAngle))*Math.sin(zAngle)+0*Math.cos(zAngle))*Math.sin(xAngle)+(0*Math.cos(yAngle)-1*Math.sin(yAngle))*Math.cos(xAngle);
//     x = (Math.cos(yAngle))*Math.cos(zAngle);
//     y = ((Math.cos(yAngle))*Math.sin(zAngle))*Math.cos(xAngle)-(-Math.sin(yAngle))*Math.sin(xAngle);
//     z = ((Math.cos(yAngle))*Math.sin(zAngle))*Math.sin(xAngle)+(-Math.sin(yAngle))*Math.cos(xAngle);

    return new BABYLON.Vector3(x,y,z);
}