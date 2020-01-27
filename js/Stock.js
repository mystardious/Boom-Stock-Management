class Case {
    constructor(brand, name, colours) {
        this.brand = brand;
        this.name = name;
        this.colours = colours;
        this.numRequired = 0;
    }
    hasColours() {
        if(this.colours.length > 0)
            return true;
        return false;
    }
    setRequired(num) {
        this.numRequired = num;
    }
    print() {
        return this.numRequired + "x " + this.brand + " " + this.name;
    }
}