import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const dummyProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API via GET', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should retrieve a product by ID from the API via GET', () => {
    service.getProductById(1).subscribe((product) => {
      expect(product).toEqual(dummyProducts[0]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts[0]);
  });

  it('should add a new product via POST', () => {
    const newProduct: Product = { id: 3, name: 'Product 3', price: 300 };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should update an existing product via PUT', () => {
    const updatedProduct: Product = { id: 1, name: 'Updated Product 1', price: 150 };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/products/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProduct);
  });

  it('should delete a product via DELETE', () => {
    service.deleteProduct(1).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.baseUrl}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
