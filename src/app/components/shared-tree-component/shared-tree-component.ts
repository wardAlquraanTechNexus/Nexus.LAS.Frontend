import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FlatTreeNode {
  expandable: boolean;
  name: string;
  icon?: string;
  level: number;
  hasChildren: boolean;
  id: number;
}

interface TreeNode {
  id: number,
  name: string;
  icon?: string;
  children?: TreeNode[];
}


@Component({
  selector: 'app-shared-tree-component',
  standalone: false,
  templateUrl: './shared-tree-component.html',
  styleUrl: './shared-tree-component.scss'
})
export class SharedTreeComponent implements OnInit {

  @Input() treeData!: TreeNode[];

  @Output() editEmitter = new EventEmitter<any>();
  @Output() deleteEmitter = new EventEmitter<any>();
  @Output() viewEmitter = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['treeData']) {
      this.dataSource.data = this.treeData;
    }
  }

  private transformer = (node: TreeNode, level: number) => {
    return {
      expandable: true, // always expandable
      name: node.name,
      level: level,
      icon: node.icon, // keep if you want icons,
      hasChildren: !!node.children && node.children.length > 0,
      id: node.id
    };
  };

  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener<TreeNode, FlatTreeNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }
  ngOnInit(): void {
    this.dataSource.data = this.treeData
  }


  hasChild = (_: number, node: FlatTreeNode) => node.hasChildren;

  onView(node: any) {
    this.viewEmitter.emit(node);
  }

  onEdit(node: any) {
    this.editEmitter.emit(node);
  }

  onDeleteWrapper(node: any) {
    this.emitDelete(node);
  }

  onRowClick(event: Event, node: any) {
    // Trigger the same action as arrow_forward button
    this.onView(node);
  }

  emitDelete(node: any) {
    this.deleteEmitter.emit(node);
  }
}
