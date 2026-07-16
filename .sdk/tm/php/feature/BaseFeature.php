<?php
declare(strict_types=1);

// FreePublicApis SDK base feature

class FreePublicApisBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreePublicApisContext $ctx, array $options): void {}
    public function PostConstruct(FreePublicApisContext $ctx): void {}
    public function PostConstructEntity(FreePublicApisContext $ctx): void {}
    public function SetData(FreePublicApisContext $ctx): void {}
    public function GetData(FreePublicApisContext $ctx): void {}
    public function GetMatch(FreePublicApisContext $ctx): void {}
    public function SetMatch(FreePublicApisContext $ctx): void {}
    public function PrePoint(FreePublicApisContext $ctx): void {}
    public function PreSpec(FreePublicApisContext $ctx): void {}
    public function PreRequest(FreePublicApisContext $ctx): void {}
    public function PreResponse(FreePublicApisContext $ctx): void {}
    public function PreResult(FreePublicApisContext $ctx): void {}
    public function PreDone(FreePublicApisContext $ctx): void {}
    public function PreUnexpected(FreePublicApisContext $ctx): void {}
}
