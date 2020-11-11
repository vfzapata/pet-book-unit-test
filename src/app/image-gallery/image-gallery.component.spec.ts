import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './image-gallery.component';
import { ImageService } from '../image.service';
import { FilterimagesPipe } from '../filterimages.pipe';
import { By } from '@angular/platform-browser';

describe('ImageGalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, FilterimagesPipe ],
      providers: [ ImageService, FilterimagesPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain page title as "Pet Book Prueba Devops"', () => {
    const title = fixture.debugElement.query(By.css('.btn-primary')).nativeElement;
    expect(title.innerHTML).toBe('Pet Book Prueba Devops');
  });

  it('click event"', () => {
    
  });

  describe('button events', () => {
    it('should contain button with "All" text', () => {
      const AllFilter = fixture.debugElement.query(By.css('.first')).nativeElement;
      expect(AllFilter.innerHTML).toBe('All');
    });
     it('should contain button with "Perro" text', () => {
       const perroFilter = fixture.debugElement.query(By.css('.second')).nativeElement;
       expect(perroFilter.innerHTML).toBe('Perro');
    });
     it('should contain button with "Gato" text', () => {
       const gatoFilter = fixture.debugElement.query(By.css('.third')).nativeElement;
      expect(gatoFilter.innerHTML).toBe('Gato');
    });
  });
});
