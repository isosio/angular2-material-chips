import { Component,
         NgModule,
         OnInit, 
         Input,
         Output,
         EventEmitter, 
         ElementRef,
         forwardRef} from '@angular/core'
import {NgClass} from '@angular/common';


import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR : any= {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaterialChipsComponent),
    multi: true
};

@Component({
  selector: 'material-chips',
  template: './templates/default/material-chips.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styles: [`
    .md-chip{background-color:#e0e0e0;color:rgba(0,0,0,0.87)}.md-chip-list input{border:none;outline:0;background:transparent}.md-chip-list .material-icons{height:15px;width:15px;float:right;position:relative;font-size:15px;border-radius:10px;left:5px;cursor:pointer}.md-chip-list .material-icons:hover{background:gray;color:black}.md-chip-list{padding-bottom:5px;box-shadow:0 1px rgba(0,0,0,0.12)}.md-chip-list.md-focused{box-shadow:0 2px #106cc8}.md-chip{display:inline-block;padding:8px 12px 8px 12px;border-radius:16px;font-size:13px;line-height:16px}
  `]
})

export class MaterialChipsComponent implements ControlValueAccessor { 

  addAreaDisplayed:boolean;           
  isTagsFocused = false;
  values:string[];
  labelToAdd:string;
  focused:string;

  @Output() tagsfocusedChange = new EventEmitter();
  
  @Input()
  get tagsfocused() {
    return this.isTagsFocused;
  }

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Output()
  labelsChange;
  
  constructor() {
    this.labelsChange = new EventEmitter();
    this.addAreaDisplayed = false;
  }

  ngOnInit() {
    this.labelsChange = new EventEmitter();
  }

  removeValue(value) {
    var index = this.values.indexOf(value, 0);
    if (index != undefined) {
      this.values.splice(index, 1);
      this.labelsChange.emit(this.values);
    }
  }

  addValue(value, event) {
    if(value==='')return;
    this.values.push(value);
    this.labelsChange.emit(this.values);
    this.labelToAdd = '';
  }
  
  //From ControlValueAccessor interface
  writeValue(value) {
      if (value !== this.values) {
          this.values = value;
      }
  } 
  //From ControlValueAccessor interface
  registerOnChange(fn) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn) {
      this.onTouchedCallback = fn;
  }  

  onFocus() {
   this.focused = 'md-focused';
   this.isTagsFocused = true;
   console.log('tags focused', this.isTagsFocused)
   this.tagsfocusedChange.emit(this.isTagsFocused)
  }
  focusOutFunction() {
    this.focused = '';
    this.isTagsFocused = false;
    console.log('tags focused', this.isTagsFocused)
    this.tagsfocusedChange.emit(this.isTagsFocused)
  } 
}