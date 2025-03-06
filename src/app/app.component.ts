import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
