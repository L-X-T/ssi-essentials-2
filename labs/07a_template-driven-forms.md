# Template Driven Forms

- [Angular Workshop: Template Driven Forms](#angular-workshop-template-driven-forms)
  - [Build-in Validators](#build-in-validators)
  - [Bonus: Component to render Validation Errors *](#bonus-component-to-render-validation-errors-)

## Using Angular Validators

In this exercise you will validate the entries in the search form of the ``FlightSearchComponent`` with the build-in validators ``required``, ``minlength``, ``maxlength`` and ``pattern`` and output any validation errors.

Before we start, please ensure that ``noPropertyAccessFromIndexSignature`` is set to false, if that flag is in your ``tsconfig.json``. If the flag is not there at all, then your Angular project was created before Version 13 (strict mode) and then the default TypeScript value will be used which is false.

You can use the following procedure as a guide:

1. Make sure that the search fields are in a ``form`` element and set up a handle for this element. Also make sure that each input field has a ``name`` attribute.

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    <form #flightSearchForm="ngForm">
        [...]
        <input name="from" [(ngModel)]="from" [...]>
        [...]
        <input name="to" [(ngModel)]="to" [...]>
        [...]
    </form>
    ```

    </p>
    </details>

2. Extend the search field ``from`` to include the validation attributes mentioned above and report any validation errors.

    <details>
    <summary>Show source</summary>
    <p>

    ```html
    <input name="from" [(ngModel)]="from"   
           required		
           minlength="3"		
           maxlength="15"		
           pattern="[a-zA-ZäöüÄÖÜß ]*">		

    <pre>{{ flightSearchForm.controls.from?.errors | json }}</pre>

    [...]
    <div class="text-danger"
         *ngIf="flightSearchForm.controls.from?.hasError('minlength')">		
        ... minlength ...
    </div>		
    [...]
    ```

    </p>
    </details>

3. Test your solution

## Bonus: Reusable component for displaying the validation errors *

In order not to have to query the validation errors in the same way over and over again for each input field, it is advisable to use a central component. This can receive the property ``errors`` of the validated ``FormControl``. For example, the expression ``flightSearchForm.controls.from?.errors`` returns the following object if both the validator ``minlength`` and a possibly self-written``city`` validator fail:

```json
{
  "minlength": {
    "requiredLength": 3,
    "actualLength": 1
  },
  "city": true
}
```

Write a component that receives this ``errors`` object (``@Input() errors: any;``) and outputs an error message for each of the errors in it. To check whether this object exists and whether it indicates a specific error, *ngIf can be used:

```html
<div *ngIf="errors && errors.required">
    This field is required.
</div>

<div *ngIf="errors && errors.minlength">
    This field is too short.
</div>
```

This component should be able to be called up as follows:

```html
<div class="form-group">
    <label>From</label>
    <input class="form-control" [(ngModel)]="from" name="from"
           required minlength="3">

    <flight-validation-errors [errors]="flightSearchForm.controls.from?.errors">
    </flight-validation-errors>
</div>
```
