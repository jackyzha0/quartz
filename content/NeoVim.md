---
title: NeoVim
compartir: true
updated: 2023-10-02
tags: [reference]
enableToc: true
aliases: [Nvim, Vim]
---

Vim-fork focused on extensibility and usability.

[Dotfiles](https://github.com/semanticdata/dotfiles) – [Website](https://neovim.io/) – [Documentation](https://neovim.io/doc/)

**Sync from CLI** → `nvim --headless "+Lazy! sync" +qa`

## Keybindings

| Key Combination | Command |
| --- | --- |
| `<leader>` | `<space>` |
| **Unsorted** |
| `<leader>h` | `^` |
| `<leader>l` | `g_` |
| `<leader>a` | `:keepjumps normal! ggVG<cr>` |
| `gy` | `"+y` |
| `gp` | `"+p` |
| `x` | `"_x` |
| `<leader>e` | `<cmd>NvimTreeToggle<cr>` |
| **Commands** |
| `<leader>w` | `<cmd>write<cr>` |
| `<leader>bq` | `<cmd>bdelete<cr>` |
| `<leader>bl` | `<cmd>buffer #<cr>` |
| `<F2>` | `<cmd>Lexplore<cr>` |
| `<space><space>` | `<F2>` |
| **Telescope** |
| `<leader><space>` | `<cmd>Telescope buffers<cr>` |
| `<leader>?` | `<cmd>Telescope oldfiles<cr>` |
| `<leader>ff` | `<cmd>Telescope find_files<cr>` |
| `<leader>fg` | `<cmd>Telescope live_grep<cr>` |
| `<leader>fd` | `<cmd>Telescope diagnostics<cr>` |
| `<leader>fs` | `<cmd>Telescope current_buffer_fuzzy_find<cr>` |
| **Telescope (builtin)** |
| `<leader>ff` | `builtin.find_files, {}` |
| `<leader>fg` | `builtin.live_grep, {}` |
| `<leader>fb` | `builtin.buffers, {}` |
| `<leader>fh` | `builtin.help_tags, {}` |
| **Normal Mode** |
| `<C-q>` | `:q!<CR>` |
| `<F4>` | `:bd<CR>` |
| **Moving Vertically** |
| `<C-d>` | `<C-d>zz` |
| `<C-u>` | `<C-u>zz` |
| `n` | `nzzzv` |
| `N` | `Nzzzv` |
| **Tab Navigation** |
| `<S-Tab>` | `gT` |
| `<Tab>` | `gt` |
| `<silent <S-t>` | `:tabnew<CR>` |
| **Pane/Window Navigation** |
| `<C-h>` | `<C-w>h` |
| `<C-j>` | `<C-w>j` |
| `<C-k>` | `<C-w>k` |
| `<C-l>` | `<C-w>l` |
| `<C-left>` | `<C-w>h` |
| `<C-down>` | `<C-w>j` |
| `<C-up>` | `<C-w>k` |
| `<C-right>` | `<C-w>l` |
| **Terminal** |
| `<A-t>` | `:sp term://pwsh<cr>i` |
| `tv` | `:lcd %:p:h<CR>:vsp term://pwsh<CR>i` |
| `th` | `:lcd %:p:h<CR>:sp term://pwsh<CR>i` |
| `<Esc>` | `<C-\\><C-n>` |
| `:q!` | `<C-\\><C-n>:q!<CR>` |

## Plugins

| Author/Plugin                                                                                                 | Description                                                          |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [akinsho/bufferline.nvim](https://github.com/akinsho/bufferline.nvim)                                         | A snazzy bufferline for Neovim.                                      |
| [akinsho/toggleterm.nvim](https://github.com/akinsho/toggleterm.nvim)                                         | A neovim lua plugin to help easily manage multiple terminal windows. |
| [ap/vim-css-color](https://github.com/ap/vim-css-color)                                                       | Preview colours in source code while editing.                        |
| [editorconfig/editorconfig-vim](https://github.com/editorconfig/editorconfig-vim)                             | EditorConfig plugin for Vim.                                         |
| [folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim)                                             | Theme                                                                |
| [kyazdani42/nvim-tree.lua](https://github.com/kyazdani42/nvim-tree.lua)                                       | A file explorer tree for neovim written in lua.                      |
| [kyazdani42/nvim-web-devicons](https://github.com/kyazdani42/nvim-web-devicons)                               | Lua "fork" of vim-web-devicons for neovim.                           |
| [lewis6991/gitsigns.nvim](https://github.com/lewis6991/gitsigns.nvim)                                         | Git integration for buffers.                                         |
| [lukas-reineke/indent-blankline.nvim](https://github.com/lukas-reineke/indent-blankline.nvim)                 | Indent guides for Neovim.                                            |
| [numToStr/Comment.nvim](https://github.com/numToStr/Comment.nvim)                                             | Smart and powerful comment plugin for neovim.                        |
| [nvim-lua/plenary.nvim](https://github.com/nvim-lua/plenary.nvim)                                             | All the lua functions I [they] don't want to write twice.            |
| [nvim-lualine/lualine.nvim](https://github.com/nvim-lualine/lualine.nvim)                                     | neovim statusline plugin written in pure lua.                        |
| [nvim-telescope/telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)                             | Find, Filter, Preview, Pick. All lua, all the time.                  |
| [nvim-treesitter/nvim-treesitter-textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects) | Syntax aware text-objects, select, move, swap, and peek support.     |
| [nvim-treesitter/nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)                         | Nvim Treesitter configurations and abstraction layer.                |
| [ThePrimeagen/vim-be-good](https://github.com/ThePrimeagen/vim-be-good)                                       | Nvim plugin designed to make you better at Vim Movements.            |
| [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive)                                                   | A Git wrapper so awesome, it should be illegal.                      |
| [vim-telescope/telescope-fzf-native.nvim](https://github.com/nvim-telescope/telescope-fzf-native.nvim)        | Find, Filter, Preview, Pick. All lua, all the time.                  |
| [wellle/targets.vim](https://github.com/wellle/targets.vim)                                                   | Vim plugin that provides additional text objects.                    |
