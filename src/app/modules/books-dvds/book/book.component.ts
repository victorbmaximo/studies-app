import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DvdComponent } from '../dvd/dvd.component';
import { Swiper, SwiperOptions } from 'swiper';
import { fromEvent } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog) {}

  animal: string;
  name: string;

  @ViewChild('swiperContainer', { static: true })
  swiperContainer: ElementRef;
  @ViewChild('swiperButtonNext', { static: true })
  swiperButtonNext: ElementRef;
  @ViewChild('swiperButtonPrev', { static: true })
  swiperButtonPrev: ElementRef;

  ngOnInit(): void {
    const swiperParams: SwiperOptions = {
      slidesPerView: 3,
      spaceBetween: 50,
      direction: 'horizontal',
      navigation: {
        nextEl: this.swiperButtonNext.nativeElement,
        prevEl: this.swiperButtonPrev.nativeElement,
      },
    };

    const mySwiper = new Swiper(
      this.swiperContainer.nativeElement,
      swiperParams
    );

    const nextSlide = fromEvent(this.swiperButtonNext.nativeElement, 'click');
    nextSlide.subscribe(() => mySwiper.slideNext());
    const prevSlide = fromEvent(this.swiperButtonPrev.nativeElement, 'click');
    prevSlide.subscribe(() => mySwiper.slidePrev());

    mySwiper.on('slideChange', (i) => console.log(i.activeIndex));
  }

  ngAfterViewInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DvdComponent, {
      panelClass: 'testClass',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
