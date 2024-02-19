import { Meta, Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  constructor(private titleService: Title, private metaService: Meta) { }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }

  private createTagObject(tag: { name?: string, property?: string, content: string, scheme?: string }): any {
    const newTag: any = tag.name ? { name: tag.name, content: tag.content } : { property: tag.property, content: tag.content };
    if (tag.scheme) {
      newTag['scheme'] = tag.scheme;
    }
    return newTag;
  }

  addMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  addMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    this.metaService.addTags(metaTags.map(tag => this.createTagObject(tag)));
  }

  updateMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  updateMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }

  removeMetaTagByName(name: string): void {
    this.metaService.removeTag(`name='${name}'`);
  }

  removeMetaTagByProperty(property: string): void {
    this.metaService.removeTag(`property='${property}'`);
  }

  getMetaTagsName(): any {
    return this.metaService.getTags('name');
  }
  getMetaTagsProperty(): any {
    return this.metaService.getTags('property');
  }
}
