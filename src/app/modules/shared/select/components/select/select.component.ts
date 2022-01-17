import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, forwardRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { SelectModel } from '../../models/select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  private _value: string | undefined;
  private _options: SelectModel[] | undefined;

  @ViewChild('inputAutoComplete') public inputAutoComplete: ElementRef | undefined;
  @ViewChild(MatAutocompleteTrigger) public autoComplete: MatAutocompleteTrigger | undefined;

  public isOpen = false;

  @Output() public readonly isClosed = new EventEmitter<boolean>();
  @Input() public set selectOptions(value: SelectModel[]) {
    this._options = value;
    this.filteredOptions = (this.searchPhrase.valueChanges as Observable<string>).pipe(
      startWith(''),
      switchMap((value: string) => this.filter(value))
    );
  }

  public searchPhrase = new FormControl('');
  public iconUp = faCaretUp;
  public iconDown = faCaretDown;
  public filteredOptions: Observable<SelectModel[]> | undefined;

  public get value(): string | undefined {
    return this._value;
  }

  @Input()
  public set value(value: string | undefined) {
    this._value = value;
    this.onChange(this._value);
    this.onTouch(this._value);
  }

  @Input() public placeholder: string | undefined;
  @Input() public loading: boolean | undefined;
  @Output() public readonly click = new EventEmitter();
  @Output() public readonly selectedValue = new EventEmitter<string | number | boolean>();

  private filter(value: string) {
    this.value = this.searchPhrase.value;
    if (!this._options) {
      return EMPTY;
    }

    return of(this._options.filter(option => String(option.value).toLowerCase().includes(value.toLowerCase())));
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: any = (): void => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouch: any = (): void => {};

  public ngOnInit(): void {
    this.searchPhrase.setValue(this.value);
  }

  public chooseOption(optionValue: string | undefined): void {
    this.selectedValue.emit(optionValue);
    this._value = optionValue;
  }

  public selectOpen(): void {
    this.onTouch(this._value);
    this.click.emit();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(value: string | undefined): void {
    this.value = value;
  }

  public closePanel(): void {
    this.autoComplete?.closePanel();
    this.inputAutoComplete?.nativeElement.blur();
  }
}
