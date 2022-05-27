package notes;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;

public class scan {
    public static void main(String[] args) {
        StringBuffer inputBuffer = new StringBuffer();
        try {
            BufferedReader file = new BufferedReader(new FileReader(args[0]));
            String line;
            
            while ((line = file.readLine()) != null) {
                if(line.startsWith("sr-due")){
                    line = "sr-due: " + (line.substring(8, 12)) + "-" + (line.substring(12, 14)) + "-" + (line.substring(14, 16));
                }
                inputBuffer.append(line);
                inputBuffer.append('\n');
            }
            file.close();           
            try {
                // write the new string with the replaced line OVER the same file
                FileOutputStream fileOut = new FileOutputStream(args[0]);
                fileOut.write(inputBuffer.toString().getBytes());
                fileOut.close();
            } catch (FileNotFoundException e) {
                System.out.println("error writing");
            }
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (IOException e) {
            System.out.println("io exception");
        }

    }
}
