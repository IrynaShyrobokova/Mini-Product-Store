import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock services
    mockProductService = jasmine.createSpyObj('ProductService', ['addProduct']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [FormsModule],  
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product properties', () => {
    expect(component.product).toEqual({
      title: '',
      price: 0,
      description: '',
      image: '',
      category: ''
    });
  });

  it('should call addProduct on ProductService when addProduct is called', () => {
    // Mock product data
    const mockProduct = {
      title: 'Test Product',
      price: 10,
      description: 'A great product',
      image: 'image-url',
      category: 'Test Category'
    };

    // Set component's product to the mock data
    component.product = mockProduct;

    // Set up the mock to return an observable
    mockProductService.addProduct.and.returnValue(of(mockProduct));

    component.addProduct();

    expect(mockProductService.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should navigate to home after product is added', () => {
    // Mock product data
    const mockProduct = {
      title: 'Test Product',
      price: 10,
      description: 'A great product',
      image: 'image-url',
      category: 'Test Category'
    };

    // Set up the mock to return an observable
    mockProductService.addProduct.and.returnValue(of(mockProduct));

    component.addProduct();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
