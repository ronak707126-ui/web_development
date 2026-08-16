#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX_SEATS 3   
#define MAX_WAIT 5    
typedef struct {
    int ticketID;
    char name[50];
} Passenger;

Passenger waitingList[MAX_WAIT];
int front = -1;
int rear = -1;
int confirmedCount = 0;
int idCounter = 101;

// Function to check if Waiting List is full
bool isFull() {
    return ((rear + 1) % MAX_WAIT == front);
}


// Function to check if Waiting List is empty
bool isEmpty() {
    return (front == -1);
}

// Add to Waiting List (Enqueue)
void addToWaitingList(char name[]) {
    if (isFull()) {
        printf(">> [ERROR] Waiting List is FULL. Cannot book more tickets.\n");
        return;
    }
    
    if (isEmpty()) front = 0;
    rear = (rear + 1) % MAX_WAIT;
    waitingList[rear].ticketID = idCounter++;
    strcpy(waitingList[rear].name, name);
    
    printf(">> [WL] %s added to Waiting List (ID: %d)\n", name, waitingList[rear].ticketID);
}

// Remove from Waiting List (Dequeue)
Passenger promoteFromWaitingList() {
    Passenger p = waitingList[front];
    
   

 if (front == rear) { // Only one element was present
        front = rear = -1;
    } else {
        front = (front + 1) % MAX_WAIT;
    }
    return p;
}
int main() {
    int choice;
    char name[50];
    printf("--- Railway Reservation System (Static Queue) ---\n");
    printf("Confirmed Capacity: %d | Waiting List Capacity: %d\n", MAX_SEATS, MAX_WAIT);

    while (1) {
        printf("\n1. Book Ticket\n2. Cancel Ticket\n3. Status\n4. Exit\nChoice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter Passenger Name: ");
                scanf("%s", name);
                
               


                    if (confirmedCount < MAX_SEATS) {
                    confirmedCount++;
                    printf(">> [CONFIRMED] Ticket booked for %s (ID: %d)\n", name, idCounter++);
                } else {
                    addToWaitingList(name);
                }
                break;

            case 2:
                if (confirmedCount > 0) {
                    confirmedCount--;
                    printf(">> [SYSTEM] A confirmed ticket was cancelled.\n");


                       if (!isEmpty()) {
                        Passenger p = promoteFromWaitingList();
                        printf(">> [UPDATE] %s (ID: %d) promoted to CONFIRMED status!\n", p.name, p.ticketID);
                        confirmedCount++;
                    } else {
                        printf(">> [SYSTEM] Seat vacant. No one in Waiting List.\n");
                    }
              


               } else {
                    printf(">> [ERROR] No tickets to cancel.\n");
                }
                break;
            case 3:
            printf("\n--- CURRENT STATUS ---\n");

             // Confirmed seats info
            printf("Confirmed Tickets: %d / %d\n", confirmedCount, MAX_SEATS);
            printf("Available Seats: %d\n", MAX_SEATS - confirmedCount);

             // Waiting list info
            if (isEmpty()) {
            printf("Waiting List: EMPTY\n");
        } else {
            printf("Waiting List:\n");
            int i = front;
            while (1) {
                printf("ID: %d | Name: %s\n", waitingList[i].ticketID, waitingList[i].name);
                if (i == rear)
                break;
              



        
        i = (i + 1) % MAX_WAIT;
            }
         }
         break;
        case 4:
        printf(">> Exiting Railway Reservation System. Thank you!\n");
        return 0;

        default:
        printf("Invalid choice!\n");
    }
}
}
  
 
 
 
 
  

