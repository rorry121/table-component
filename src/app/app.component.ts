import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = [];
  listOfData = [];

  constructor() {
    setTimeout(() => {
      this.title = ['asdas123d' , 'as123', 'asdccasqwe1'];
      this.listOfData = [
        {
          key: '1',
          name: 'John BrowJohn BrownJohn BrownJohn BrownJohn BrownJohn Brownn',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim GrLondon No. 1 Lake Parkeen',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 323232323232323232323232323232323232323232,
          address: 'Sidney No. 1 Lake Sidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkPark'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];
    }, 2000);
  }

  delete(i: number) {
    this.listOfData.splice(i ,1);
  }

  show() {
    this.listOfData = [];
    setTimeout(() => {
      this.listOfData = [
        {
          key: '1',
          name: 'John BrowJohn BrownJohn BrownJohn BrownJohn BrownJohn Brownn',
          age: 32,
          address: 'New York No. 1 Lake Park'
        },
        {
          key: '2',
          name: 'Jim GrLondon No. 1 Lake Parkeen',
          age: 42,
          address: 'London No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 323232323232323232323232323232323232323232,
          address: 'Sidney No. 1 Lake Sidney No. 1 Lake ParkSidney No. 1 Lake ParkSidney No. 1 Lake ParkPark'
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];
    }, 500);
  }
}
