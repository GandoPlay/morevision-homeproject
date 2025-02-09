import { Routes } from '@angular/router';
import { EditModalComponent } from './components/EditModal/EditModal.component';
import { PrefixComponent } from './components/Prefix/prefix.component';
import { MainComponent } from './main.component';

export const routes: Routes = [
  { path: 'prefix', component: PrefixComponent },
  { path: '', component: MainComponent },
];
