import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentSection = 'Section 1';
  api_data: any;
  section_title_list : [];
  constructor() {

    this.api_data = {
      "title": "Page title",
      "sections": "<div><div class=\"section\"><h2 class=\"title\">Section 1</h2><p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus blandit nisl nec semper. Donec nisl neque, vehicula at accumsan in, ultricies a ligula. Nunc iaculis nisi vitae ullamcorper mollis. Aenean rutrum vehicula nisi sit amet luctus. Nam porta tellus vel faucibus rhoncus. Suspendisse sem orci, laoreet ac pulvinar sed, ultricies aliquam eros. Quisque non tellus nunc. Suspendisse eu lacus sed lectus mattis convallis at eu ex. Nulla facilisi.</p><p class=\"content\">Etiam fringilla volutpat nunc, eget malesuada diam tristique eu. Pellentesque at nulla dignissim, commodo dui sed, eleifend diam. Donec dapibus tristique nibh. Aenean eu augue turpis. Nam finibus ex et nisl dictum, in tempor tortor sollicitudin. Nunc bibendum augue vitae ante maximus, at bibendum risus fringilla. Nam volutpat sed quam nec egestas.</p><p class=\"content\">Maecenas ullamcorper nisi ac nulla aliquet, ut maximus sapien ultrices. Praesent volutpat lacus lectus, eget euismod est porttitor a. Sed et nunc gravida dui mattis scelerisque ac eget justo. Praesent non velit nunc. Integer vulputate congue felis ut cursus. Morbi felis dui, efficitur eget sem nec, iaculis ornare ante. Pellentesque accumsan, dolor ut iaculis efficitur, enim magna rutrum turpis, sed tincidunt ligula odio id lectus. Suspendisse potenti. Vestibulum mi mauris, mattis non orci non, dictum posuere turpis. Proin consequat gravida dui id venenatis.</p></div><div class=\"section\"><h2 class=\"title\">Section 2</h2><p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur luctus blandit nisl nec semper. Donec nisl neque, vehicula at accumsan in, ultricies a ligula. Nunc iaculis nisi vitae ullamcorper mollis. Aenean rutrum vehicula nisi sit amet luctus. Nam porta tellus vel faucibus rhoncus. Suspendisse sem orci, laoreet ac pulvinar sed, ultricies aliquam eros. Quisque non tellus nunc. Suspendisse eu lacus sed lectus mattis convallis at eu ex. Nulla facilisi.</p><p class=\"content\">Etiam fringilla volutpat nunc, eget malesuada diam tristique eu. Pellentesque at nulla dignissim, commodo dui sed, eleifend diam. Donec dapibus tristique nibh. Aenean eu augue turpis. Nam finibus ex et nisl dictum, in tempor tortor sollicitudin. Nunc bibendum augue vitae ante maximus, at bibendum risus fringilla. Nam volutpat sed quam nec egestas.</p></div><div class=\"section\"><h2 class=\"title\">Section 3</h2><p class=\"content\">Etiam fringilla volutpat nunc, eget malesuada diam tristique eu. Pellentesque at nulla dignissim, commodo dui sed, eleifend diam. Donec dapibus tristique nibh. Aenean eu augue turpis. Nam finibus ex et nisl dictum, in tempor tortor sollicitudin. Nunc bibendum augue vitae ante maximus, at bibendum risus fringilla. Nam volutpat sed quam nec egestas.</p><p class=\"content\">Maecenas ullamcorper nisi ac nulla aliquet, ut maximus sapien ultrices. Praesent volutpat lacus lectus, eget euismod est porttitor a. Sed et nunc gravida dui mattis scelerisque ac eget justo. Praesent non velit nunc. Integer vulputate congue felis ut cursus. Morbi felis dui, efficitur eget sem nec, iaculis ornare ante. Pellentesque accumsan, dolor ut iaculis efficitur, enim magna rutrum turpis, sed tincidunt ligula odio id lectus. Suspendisse potenti. Vestibulum mi mauris, mattis non orci non, dictum posuere turpis. Proin consequat gravida dui id venenatis.</p></div></div>"
    }

    let getFromBetween = {
      results: [],
      string: "",
      getFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1) + sub1.length;
        var string1 = this.string.substr(0, SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP, TP);
      },
      removeFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
        this.string = this.string.replace(removal, "");
      },
      getAllResults: function (sub1, sub2) {
        // first check to see if we do have both substrings
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1, sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1, sub2);

        // if there's more substrings
        if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
          this.getAllResults(sub1, sub2);
        }
        else return;
      },
      get: function (string, sub1, sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1, sub2);
        return this.results;
      }
    };

    this.section_title_list = getFromBetween.get(this.api_data.sections,"<h2 class=\"title\">","</h2>");    

  }

  custom_contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function (element) {
      return RegExp(text).test(element.textContent);
    });
  }

  onSectionChange(sectionId: string) {    
    this.currentSection = sectionId;    

  }

  scrollTo(section) {
    this.custom_contains(".title", section)[0].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
