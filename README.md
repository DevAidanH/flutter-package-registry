# Flutter Package Registry

**Flutter Package Registry** is a community-driven project that tracks popular Flutter/Dart packages which are no longer actively maintained.

### V2 Now released - https://savethisflutterpackage.com/
- Save our favourites packages
- Search functions added
- Sorting functions added
- Highlights section added

## What It Does

This tool identifies packages on [pub.dev](https://pub.dev/) that:

- Have **100,000+ downloads**

- Haven’t been updated in **over 12 months**

  
Using a Python scraper, the project extracts relevant data and saves it in a `JSON` file for easy reference. The results are then displayed on a clean, lightweight website built using **vanilla HTML, CSS, and JavaScript**, and hosted via **GitHub Pages**. 

Version two has now been released. The python web scraper is ran through Google Cloud Services every Friday. The list of packages is saved to Firebase FireStore and displayed to a fast, responsive React website. Users also have the ability to login and save packages to their favorites list as well as searching and sorting through the full list of packages. 

## Live Website

[View the project live](https://savethisflutterpackage.com/)

## Why This Matters

Outdated dependencies can introduce bugs, security vulnerabilities, and compatibility issues. This project helps developers make informed decisions when choosing third-party packages for their Flutter apps.

## Contributing

Contributions are welcome! Whether it’s improving the scraper, enhancing the website, or updating data—feel free to open a pull request.

## License

This project is licensed under the **MIT License**.  

You are free to use, modify, and distribute this software with proper attribution.

## Credits

Inspired by this [Reddit post](https://www.reddit.com/r/FlutterDev/comments/1k9rhfx/giving_back_what_flutter_packages_are_missing/) from the FlutterDev community. Full credit and thanks to the original poster and commentators for sparking the idea.