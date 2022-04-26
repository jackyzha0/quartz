#include <stdio.h>
#include <stdlib.h>
#ifdef WIN32
#  include <windows.h>
#else
#  include <sys/time.h>
#  include <sys/resource.h>
#endif
#include "cmark.h"


#ifdef WIN32

double get_time()
{
    LARGE_INTEGER t, f;
    QueryPerformanceCounter(&t);
    QueryPerformanceFrequency(&f);
    return (double)t.QuadPart/(double)f.QuadPart;
}

#else


double get_time()
{
    struct timeval t;
    struct timezone tzp;
    gettimeofday(&t, &tzp);
    return t.tv_sec + t.tv_usec*1e-6;
}

#endif

int main(int argc, char **argv) {
    char *markdown_file;
    FILE *fp;
    size_t size;
    char *buf;
    char *html;
    double start, sum;
    int i, n;

    n = argc > 1 ? atoi(argv[1]) : 50;
    markdown_file = argc > 2 ? argv[2] : "_data.md";

    fp = fopen(markdown_file,"r");
    if(fp == NULL){
      fprintf(stderr, "can not open %s", markdown_file);
      exit(1);
    }

    if(fseek(fp, 0, SEEK_END) != 0) {
      fprintf(stderr, "can not seek %s", markdown_file);
      exit(1);
    }
    if((size = ftell(fp)) < 0) {
      fprintf(stderr, "can not get size of %s", markdown_file);
      exit(1);
    }
    if(fseek(fp, 0, SEEK_SET) != 0) {
      fprintf(stderr, "can not seek %s", markdown_file);
      exit(1);
    }
    buf = malloc(sizeof(char) * size);
    if(buf == NULL) {
      fprintf(stderr, "can not allocate memory for %s", markdown_file);
      exit(1);
    }

    if(fread(buf, 1, size, fp) < size) {
      fprintf(stderr, "failed to read for %s", markdown_file);
      exit(1);
    }

    fclose(fp);

    for(i = 0; i < n; i++) {
      start = get_time();
      html = cmark_markdown_to_html(buf, size, CMARK_OPT_UNSAFE);
      free(html);
      sum += get_time() - start;
    }
    printf("----------- cmark -----------\n");
    printf("file: %s\n", markdown_file);
    printf("iteration: %d\n", n);
    printf("average: %.10f sec\n", sum / (double)n);

    free(buf);
    return 0;
}
