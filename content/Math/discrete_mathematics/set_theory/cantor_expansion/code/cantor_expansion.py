class CantorExpansion():
    def cantor_encode(self, s:list) -> int:

        '''
        Encode a list of integers to a single integer using Cantor expansion.
        '''

        count  = 0

        for i in range(len(s)):
            count += self.factorial(len(s) - i - 1) * (s[i] - self.count_smaller(s, i) - 1)

        return count
    
    def cantor_decode(self, x:int, n:int) -> list:
            
            '''
            Decode a single integer to a list of integers using Cantor expansion.
            '''

            s = [None] * n
            used_dict = {}

            for num in range(1, n + 1):
                used_dict[num] = False


            iter = 0
            for i in range(n - 1, -1, -1):

                smaller = x // self.factorial(i)
                x %= self.factorial(i)

                count = 0
                for i in range(1, n + 1):
                    if not used_dict[i]:
                        count += 1
                        if count == smaller + 1:
                            s[iter] = i
                            used_dict[i] = True
                            iter += 1
                            break
                
            return s

    def factorial(self, x:int) -> int:
        if x == 1 or x == 0:
            return 1
        else:
            return self.factorial(x - 1) * x
        
    def count_smaller(self, s:list, i:int) -> int:
        count = 0
        for j in range(i):
            if s[j] < s[i]:
                count += 1
        return count

        
if __name__ == '__main__':
    s = CantorExpansion()
    print(s.cantor_encode([3, 5, 7, 4, 1, 2, 9, 6, 8]))
    print(s.cantor_decode(0, 9))
