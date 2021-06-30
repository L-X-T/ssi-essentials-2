# Angular Components

- [Components deep dive](#Components-deep-dive)
  - [FlightCardComponent](#FlightCardComponent)
  - [Bonus: FlightStatusToggleComponent **](Bonus-FlightStatusToggleComponent-)
  - [Bonus: Content Projection **](Bonus-Content-Projection-)

## Components deep dive

In this exercise you will first create the FlightCardComponent shown. Then you will create your own component with the knowledge you have built up in a bonus exercise.

### FlightCardComponent

1. Create a new component ``flight-card`` in the folder of the module ``flight-booking``, which consists of a sub-folder ``flight-card`` with the following files:

    - ``flight-card.component.html``
    - ``flight-card.component.ts``

2. Open the file ``flight-card.component.ts`` and add the following members:

    ```TypeScript
    @Component({
      selector: 'app-flight-card',
      templateUrl: './flight-card.component.html'
    })
    export class FlightCardComponent implements OnInit {

      @Input() item: Flight;
      @Input() isSelected: boolean;
      @Output() isSelectedChange = new EventEmitter<boolean>();

      ngOnInit(): void {}

      select(): void {
        this.isSelected = true;
        this.isSelectedChange.emit(this.isSelected);
      }

      deselect(): void {
        this.isSelected = false;
        this.isSelectedChange.emit(this.isSelected);
      }
    }
    ```

   Note that the _flight-card_ selector was set here, you could also use _app-flight-card_ of course.

3. Open the template of this component (``flight-card.component.html``). Expand this file so that the map is displayed:

    ```TypeScript
    <div class="card" [style.background-color]="isSelected ? 'rgb(204, 197, 185)' : 'white'">
      <div class="header">
        <h2 class="title">{{ item.from }} - {{ item.to }}</h2>
      </div>

      <div class="content">
        <p>Flight-No.: #{{ item.id }}</p>
        <p>Date: {{ item.date | date:'dd.MM.yyyy HH:mm' }}</p>
        <p>
          <button *ngIf="!isSelected" class="btn btn-default" (click)="select()">
            Select
          </button>
          <button *ngIf="isSelected" class="btn btn-default" (click)="deselect()">
            Deselect
          </button>
        </p>
      </div>
    </div>
    ```

   Note the data binding expressions in this template.

4. Switch to the _flight-booking.module.ts_ file. Make sure that the new _FlightCardComponent_ is registered here.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        SharedModule
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent  // <-- important
      ],
      exports: [
        FlightSearchComponent
      ]
    })
    export class FlightBookingModule { }
    ```

    </p>
    </details>

5. Open the file _flight-search.component.ts_ and add the one property _basket_:

    ```TypeScript
    export class FlightSearchComponent implements OnInit {

      from = '';
      to = '';
      flights: Flight[] = [];
      selectedFlight: Flight;


      basket: { [id: number]: boolean } = {   // <-- new attribute
        3: true,
        5: true
      };

      […]
    }
    ```

6. Open the file _flight-search.component.html_. Comment out the tabular output of the flights found.

7. Instead of the table, use the new element ``flight-card`` to display the flights found. To do this, create an explicit binding for the properties ``item``, ``isSelected`` and the event ``isSelectedChange``.

    <details>
    <summary>Show source</summary>
    <p>

    ```HTML
    <div class="row">
      <div *ngFor="let f of flights"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <app-flight-card
            [item]="f"
            [isSelected]="basket[f.id]"
            (isSelectedChange)="basket[f.id] = $event">
        </app-flight-card>
      </div>
    </div>
    ```

    </p>
    </details>

8. At the end of the template, also update the shopping cart so that the new property ``basket`` is output here instead of ``selectedFlight``.

    <details>
    <summary>Show source</summary>
    <p>

    ```HTML
    <div class="card">
      <div class="content">
        <pre>{{ basket | json }}</pre>
      </div>
    </div>
    ```

    </p>
    </details>

9. Test your solution.

10. When calling the _FlightCardComponent_, use a two-way binding using the "Banana-in-a-Box syntax" instead of the bindings for _isSelected_ and _isSelectedChanged_.

    <details>
    <summary>Show source</summary>
    <p>

    ```TypeScript
    <div class="row">
      <div *ngFor="let f of flights"
           class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <flight-card
            [item]="f"
            [(isSelected)]="basket[f.id]">
        </flight-card>
      </div>
    </div>
    ```

    </p>
    </details>

11. Test your solution.

### Bonus: FlightStatusToggleComponent **

Create a _StatusToggleComponent_ that receives the delayed flag of a flight via two-way binding and displays it as a link. Each time you click on this link, the status should be changed. The component should be able to be called in the template of the FlightCardComponent as follows:

```HTML
<app-flight-status-toggle [(isDelayed)]="item.delayed"></app-flight-status-toggle>
```

### Bonus: Content Projection **

In this bonus exercise you create the possibility of expanding the display of the _FlightCardComponent_ by transferring additional HTML to be displayed when it is called.

1. Open the file flight-search.component.html and transfer additional HTML to the_FlightCardComponent_:

    ```HTML
    <app-flight-card […]>
      <pre>{{ f | json }}</pre>
    </app-flight-card>
    ```

2. Place the _ng-content_ element in the **Template** of the **FlightCardComponent** to indicate where the passed content should be displayed:

    ```HTML
    […]
    <div class="content">
      <p>Flight-No.: #{{item.id}}</p>
      <p>Date: {{item.date | date:'dd.MM.yyyy HH:mm'}}</p>

      […]

      <ng-content></ng-content>
    </div>
    […]
    ```

3. Test your solution.

4. Add to the template so that it now uses the _ng-content_ element twice - once in the upper area and once in the lower area of the component:
    ```HTML
    […]
    <div class="content">
      <p>Flight-No.: #{{item.id}}</p>
      <p>Date: {{item.date | date:'dd.MM.yyyy HH:mm'}}</p>

      […]

      <ng-content select=".bottom"></ng-content>
    </div>
    […]
    ```

   In order to show Angular what has to be inserted into the individual placeholders defined with _ng-content_, they receive a CSS selector via the property _select_, which addresses part of the transferred markup. For example, the _.top_ selector searches the markup for an element with the _top_ class and inserts it into the respective _ng-content_ element.

5. Open the file _flight-search.component.html_. When calling the _flight-card_ elements, pass the two defined placeholders:

    ```HTML
    <app-flight-card [...]>
      <h3 class="top">Flight</h3>
      <app-flight-status-toggle class="bottom" style="margin-left: 10px" [(isDelayed)]="f.delayed"></app-flight-status-toggle>
    </app-flight-card>
    ```

6. Test your solution.
