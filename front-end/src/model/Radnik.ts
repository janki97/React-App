export default class Radnik {
    
    
   private id: number;
   private imePrezime: string;
   private datumZaposlenja:Date;

   constructor(id: number, imePrezime: string, datumZaposlenja:Date) {
       this.id = id;
       this.imePrezime = imePrezime;
       this.datumZaposlenja = datumZaposlenja;
   }

   public getId() {

       return this.id;
   }

   public setId(id: number) {

       this.id = id;
   }


   public getImePrezime() {

       return this.imePrezime;
   }

  public setImePrezime(imePrezime: string) {

       this.imePrezime= imePrezime;
   }

   public getDatumZaposlenja() {

       return this.datumZaposlenja;
   }

   public setDatumZaposlenja(datumZaposlenja: Date) {

       this.datumZaposlenja = datumZaposlenja;
   }
}