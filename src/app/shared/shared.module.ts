import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations: [
        SidebarComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SidebarComponent
    ]
})
export class SharedModule {
    
}