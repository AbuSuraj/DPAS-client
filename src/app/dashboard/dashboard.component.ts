import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  onSidebarNavigate(item: string): void {
    // Implement the logic for navigation based on the selected menu item
    console.log(`Navigating to: ${item}`);
  }
}
