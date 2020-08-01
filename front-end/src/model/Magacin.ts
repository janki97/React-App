export default class Magacin {
    
    
   private id:number
   private vrstaRobe:string
    
    
    constructor(id:number, vrstaRobe:string){
   
    
    this.id = id;
    this.vrstaRobe = vrstaRobe
    
    }
    
    public getId() {
    
        return this.id;
    }
    
    public setId(id: number) {
    
        this.id = id;
    
    }
    
    
    public getVrstaRobe() {
    
        return this.vrstaRobe;
    }
    
    public setVrstaRobe(vrstaRobe: string) {
    
        this.vrstaRobe = vrstaRobe;
    
    }

}