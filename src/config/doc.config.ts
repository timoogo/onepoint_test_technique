import { ConfigBase } from "./config.base";

export class DocConfig extends ConfigBase {

    static addDisclaimer(text: string) {
       return `<div style="color: red; font-weight: bold;">${text}</div>`;
    }


    static addBrTags(text: string) {
       return text.replace(/\n/g, "<br>");
    }
 
  static addTitleLevel(text: string, level: number) {
    return `<h${level}>${text}</h${level}>`;
  }
    
    static centerText(text: string) {
       return `<center>${text}</center>`;
    }
 
    static addBoldTags(text: string) {
       return `<b>${text}</b>`;
    }
 
    static addItalicTags(text: string) {
       return `<i>${text}</i>`;
    }
 
    static addUnderlineTags(text: string) {
       return `<u>${text}</u>`;
    }
 
    static addStrikethroughTags(text: string) {
       return `<strike>${text}</strike>`;
    }
 
    /**
     * Applique une série de transformations sur un texte donné
     * @param text - Texte à modifier
     * @param transformations - Liste des transformations à appliquer
     * @returns Texte transformé
     */
    static applyTransformations(text: string, transformations: Array<(t: string) => string>) {
       return transformations.reduce((acc, fn) => fn(acc), text);
    }

    /**
 * Génère un message d'avertissement standard avec un titre et un message centré.
 */
    static generateWarningMessage(messages: string | string[], doc?: string): string {
      const formattedMessage = Array.isArray(messages) 
        ? messages.join("\n\n")  // Double saut de ligne pour simuler des <br>
        : messages;
    
      return `## ⚠️ Attention ⚠️  
    ${doc ? `**${doc}**` : ""}  
    
    ${formattedMessage}`;
    }
    

 }
 