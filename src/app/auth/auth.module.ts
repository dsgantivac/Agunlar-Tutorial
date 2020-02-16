import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: "", component: AuthComponent}])
    ],
    exports: [
        AuthComponent,
        RouterModule
    ]
})
export class AuthModule{

}