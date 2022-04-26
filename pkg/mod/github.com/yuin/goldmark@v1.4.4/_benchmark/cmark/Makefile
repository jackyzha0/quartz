CMARK_BIN=cmark_benchmark
CMARK_RUN=LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:./cmark-master/build/src ./$(CMARK_BIN)
ifeq ($(OS),Windows_NT)
  CMARK_BIN=cmark_benchmark.exe
  CMARK_RUN=bash -c "PATH=./cmark-master/build/src:$${PATH} ./$(CMARK_BIN)"
endif
ifneq ($(WSL_INTEROP),)
  CMARK_BIN=cmark_benchmark.exe
  CMARK_RUN=cp ./cmark-master/build-mingw/windows/bin/libcmark.dll . && ./$(CMARK_BIN); rm -f libcmark.dll
endif

.PHONY: run

run: $(CMARK_BIN)
	@ $(CMARK_RUN)
	@ if [ -z "$${WSL_INTEROP}" ]; then \
		go run ./goldmark_benchmark.go; \
	else \
		GOOS=windows GOARCH=amd64 go build -o goldmark_benchmark.exe ./goldmark_benchmark.go && ./goldmark_benchmark.exe; \
	fi

./cmark-master/build/src/config.h:
	wget -nc -O cmark.zip https://github.com/commonmark/cmark/archive/master.zip
	unzip cmark.zip
	rm -f cmark.zip
	@ if [ -z "$${WSL_INTEROP}" ]; then \
		cd cmark-master && make;
	else \
		cd cmark-master && make mingw; \
	fi

$(CMARK_BIN): ./cmark-master/build/src/config.h
	@ if [ -z "$${WSL_INTEROP}" ]; then \
		gcc -I./cmark-master/build/src -I./cmark-master/src  cmark_benchmark.c -o $(CMARK_BIN) -L./cmark-master/build/src -lcmark; \
	else \
		i686-w64-mingw32-gcc -I./cmark-master/build-mingw/windows/include cmark_benchmark.c -o $(CMARK_BIN) -L./cmark-master/build-mingw/windows/lib -lcmark.dll; \
	fi

.PHONY: clean
clean:
	rm -f $(CMARK_BIN)
	rm -f goldmark_benchmark.exe
