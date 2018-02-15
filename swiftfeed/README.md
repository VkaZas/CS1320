### SwiftFeed 

In this assignment I also used _materialize.css_ to achieve a simple collection effect.

Time interval of updating tweets is set to 5 seconds to make the entire list more readable. And I noticed that the data from feeding server is not strictly sorted by _timestamp_ms_ attribute, so I sorted data before applying them to the list.

After removing duplicated data and restricting amount of items to be lower than 26 by deleting oldest data, the newest tweets can now positioned at the top of the list.