import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryAddDialogComponent } from 'src/app/_shared/category-add-dialog/category-add-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['no', 'name', 'action'];
  categoryData = new MatTableDataSource<Category>();
  isLoadingData: boolean = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.categoryService.getCategories().subscribe(
      (result: any) => {
        this.categoryData.data = result;
        this.categoryData.paginator = this.paginator;
        this.isLoadingData = false;
      }
    )
  }

  onAdd() {
    const dialogRef = this.dialog.open(CategoryAddDialogComponent, {
      width: '35%'
    });

  }

}
