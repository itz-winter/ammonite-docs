# Ammonite Discord Bot

Ammonite is a feature-rich, Java-based Discord bot built with JDA (Java Discord API). It provides a full suite of moderation, economy, levelling, configuration, utility, games, proxy, and support tools — all manageable through both slash commands and prefix commands.

### [Official Website, Guide, Documentation, and more!](https://ammonite.kelpw.ing/)

## Features

- **Global Chat Relay**: Seamlessly relay messages across multiple servers with cross-server deletion and reply jump links.
- **Moderation Tools**: Ban, kick, mute, timeout, warn, softban, lockdown, purge, and more — with history tracking.
- **Anti-Spam**: Configurable anti-spam detection with a GUI management interface.
- **Suspicious Account Detection**: Automatically flags and reports newly-created accounts joining your server, with configurable notification channels and roles.
- **Auto-Logging**: Automatic event logging (joins, leaves, edits, deletes, bans, etc.) to a designated channel.
- **Auto-Config**: Guided server setup assistant.
- **Automod**: Built-in automoderator configuration.
- **Welcome Messages**: Customisable welcome messages and banners for new members.
- **Reaction Roles**: Assign roles based on message reactions.
- **Role Persistence**: Restore roles to members who rejoin the server.
- **Economy System**: Per-server economy with balance, bank, daily rewards, gambling (blackjack, dice, slots, coin flip), work, rob, and transactions.
- **Levelling System**: XP and level tracking with rank cards and a leaderboard.
- **Ticket System**: Support ticket creation and management.
- **Games**: Blackjack, Poker, Chess, and more.
- **Music Playback**: Stream music from YouTube and other sources in voice channels via LavaPlayer, including Spotify link support.
- **Proxy System**: Multi-account proxy/character system for roleplay servers.
- **Backup**: Server configuration backup and restore.
- **Permissions Management**: Fine-grained command permission overrides per server.
- **Server Stats**: Live server statistics display.
- **Utility Commands**: Avatar, server info, echo, embed builder, pronoun tags, pride flags, jokes, dad jokes, rules, privacy, support, appearance customisation, and more.
- **Prefix Commands**: Traditional text-based commands alongside slash commands.

## Prefix Commands

Each server can configure its own set of command prefixes independently.

| Subcommand | Description |
| --- | --- |
| `/prefix set prefix:!` | Replace all prefixes with a single new one |
| `/prefix add prefix:-k` | Add an additional prefix (multiple can be active at once) |
| `/prefix remove prefix:!` | Remove a specific prefix |
| `/prefix enable command:ping` | Re-enable a previously disabled command |
| `/prefix disable command:ping` | Disable a specific command for this server |
| `/prefix enable-all` | Re-enable all prefix commands |
| `/prefix disable-all` | Disable all prefix commands server-wide |
| `/prefix status` | Show all active prefixes and disabled commands |
| `/prefix list` | List all available prefix commands |

> **Note:** A server must always have at least one prefix — `/prefix remove` will refuse to remove the last one. The default prefix is `/`.

## Music

The bot supports music playback in voice channels via LavaPlayer, including YouTube and Spotify links.

| Command | Description |
| --- | --- |
| `!play <query or URL>` | Play a song or add it to the queue |
| `!skip` | Skip the current song |
| `!stop` | Stop playback and clear the queue |
| `!queue` | Show the current queue |
| `!pause` / `!resume` | Pause or resume playback |
| `!volume <0-100>` | Adjust the playback volume |
| `!leave` | Disconnect the bot from voice |

> The bot will automatically disconnect when the voice channel is empty or when kicked.

## Bot Discord Profile Bio

...and it's another general-purpose bot-

Heya! I am Ammonite, a powerful, configurable, feature-packed general-purpose bot. I have a ton of features-moderation, economy, levelling, utility, and more! I am the perfect fit for any server. I am always here to help!

Help: `/help [command]`
Website: https://ammonite.kelpw.ing/
