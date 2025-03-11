interface Stubs {
    c: string;
    cpp: string;
    py: string;
    js: string;
    java: string;
}

const stubs: Stubs = {
    c: `
/*****************************************

Welcome to Kodejet.
Code, Compile and Run C program online.
******************************************/
    
    
#include <stdio.h>

int main() {
  printf("Hello world!\\n");
  return 0;
}
`,

    cpp: `
/******************************************

Welcome to Kodejet.
Code, Compile and Run C++ program online.
*******************************************/
    
#include <iostream>
#include <stdio.h>

using namespace std;

int main() {
  cout<<"Hello world!\\n";
  return 0;
}
`,

py: `"""
*******************************************

Welcome to Kodejet.
Code, Compile and Run Python program online.
*******************************************
"""

print("Hello world!");`,

    js: `
/********************************************

Welcome to Kodejet.
Code, Compile and Run Javascript program online.
********************************************/
    
console.log("Hello world!");
`,

    java: `
/***************************************

Welcome to Kodejet.
Code, Compile and Run Java program online.
****************************************/
    
    
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello world!");
  }
}
`,
};

export default stubs;
