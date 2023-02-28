{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";

    als-src = {
      # url = "git+file:../agda-language-server";
      url = "github:banacorn/agda-language-server";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, utils, ... } @ inputs:
    utils.lib.eachSystem (with utils.lib.system; [ x86_64-linux ]) (system:
      let
        inherit (pkgs) lib stdenv;
        pkgs = import nixpkgs { inherit system; };

        # als = als-src.packages.${system}.default;
        als = lib.pipe inputs.als-src [
          (src: pkgs.haskellPackages.callCabal2nix "agda-language-server" src { })
          (pkg: pkgs.haskell.lib.appendPatch pkg ./2.6.2.2.patch)
        ];
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.agda
            pkgs.nodejs
            als
          ];

          # nix-ld stuff
          NIX_LD = lib.fileContents "${stdenv.cc}/nix-support/dynamic-linker";
          NIX_LD_LIBRARY_PATH = lib.makeLibraryPath [ stdenv.cc.cc.lib ];
        };
      });
}
