import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageService } from '../image.service';
import { ImageDetailComponent } from './image-details.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
// Added minor change

describe('ImageDetailsComponent', () => {
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [ ImageService,
      {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'id': '1'}}}
        }
      ],
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ImageDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should render a single image', () => {
    const findImage = fixture.debugElement.query(By.css('.img-container')).nativeElement;
    fixture.detectChanges();
    // expect(findImage.length).toEqual(0);
    expect(findImage).toBeTruthy();
  });
});
