import { SelectDOMComponent } from './Components/select-dom/select-dom.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./Components/header/header.component";
import { RouterModule, RouterLink } from "@angular/router";
import { SpinnerComponent } from "./Components/spinner/spinner.component";


@NgModule({
    declarations: [HeaderComponent, SpinnerComponent, SelectDOMComponent],
    imports: [CommonModule, RouterLink, RouterModule],
    providers: [],
    exports: [HeaderComponent, SpinnerComponent, SelectDOMComponent,]
})

export class SharedModule { }